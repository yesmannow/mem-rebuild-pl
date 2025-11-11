from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List

router = APIRouter()

class PRValidationRequest(BaseModel):
    pr_number: Optional[int] = None
    pr_body: str
    linked_issues: List[str] = []
    checklist_completed: bool = False

class PRValidationResponse(BaseModel):
    valid: bool
    errors: List[str] = []
    warnings: List[str] = []

@router.post("/validate", response_model=PRValidationResponse)
async def validate_pr(request: PRValidationRequest):
    """
    Validate PR has linked issue and completed checklist
    """
    errors = []
    warnings = []
    
    # Check for linked issue
    if not request.linked_issues and not any(
        keyword in request.pr_body.lower() 
        for keyword in ['closes', 'fixes', 'resolves', 'related to']
    ):
        errors.append("PR must link to an issue using 'Closes #X', 'Fixes #X', or 'Related to #X'")
    
    # Check for checklist completion
    if not request.checklist_completed:
        # Try to detect checklist in PR body
        checklist_markers = ['- [x]', '- [X]', '* [x]', '* [X]']
        has_checklist = any(marker in request.pr_body for marker in checklist_markers)
        
        if not has_checklist:
            warnings.append("PR should include a checklist with acceptance criteria")
        else:
            # Count completed items
            completed = sum(1 for marker in checklist_markers if marker in request.pr_body)
            if completed < 3:
                warnings.append(f"Only {completed} checklist items completed. Consider completing more items.")
    
    # Check for performance budgets mention
    if 'performance' not in request.pr_body.lower() and 'lcp' not in request.pr_body.lower():
        warnings.append("Consider mentioning performance impact (LCP, CLS, TBT)")
    
    # Check for accessibility mention
    if 'accessibility' not in request.pr_body.lower() and 'a11y' not in request.pr_body.lower():
        warnings.append("Consider mentioning accessibility impact")
    
    valid = len(errors) == 0
    
    return PRValidationResponse(
        valid=valid,
        errors=errors,
        warnings=warnings
    )

@router.post("/check-scope")
async def check_pr_scope(request: PRValidationRequest):
    """
    Check if PR scope is appropriate (not too large, focused)
    """
    # Simple heuristic: check PR body length and keywords
    body_length = len(request.pr_body)
    
    if body_length < 50:
        return {
            "valid": False,
            "warning": "PR description seems too short. Please add more context."
        }
    
    if body_length > 5000:
        return {
            "valid": False,
            "warning": "PR description is very long. Consider splitting into multiple PRs."
        }
    
    return {
        "valid": True,
        "message": "PR scope looks appropriate"
    }

