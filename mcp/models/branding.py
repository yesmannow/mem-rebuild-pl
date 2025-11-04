from pydantic import BaseModel

class LogoRequest(BaseModel):
    initials: str
    theme: str = "modern"