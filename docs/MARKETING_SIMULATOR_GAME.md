# Marketing Strategy Simulator Game

A comprehensive, game-like marketing simulation experience built with React, TypeScript, and Recharts. This interactive simulator allows users to experience the role of a Chief Marketing Officer (CMO) running quarterly campaigns.

## Features

### Phase 0: Company Setup
- **Company Naming**: Personalize your business venture
- **Industry Selection**: Choose from 5 industries (Healthcare, Legal Services, E-commerce, SaaS, Manufacturing)
- **Company Size**: Select Startup, SMB, or Enterprise (each with unique characteristics)
- **Market Landscape**: Disruptor, Crowded Field, or Open Frontier
- **Time Horizon**: 1-year, 3-year, or 5-year strategic planning
- **Budget Allocation**: Strategic distribution across Brand Awareness, Lead Generation, and Conversion Optimization

### Quarterly Gameplay (Q1-Q4)
- **22 Marketing Tactics**: Choose from SEO, Paid Ads, Content Marketing, Social Media, Events, PR, Email, and Partnerships
- **Industry-Specific Effectiveness**: Each tactic has different ROI multipliers based on your industry
- **Real-time Budget Tracking**: Monitor spending and remaining budget
- **Tactical Customization**: Adjust spend levels for each selected tactic

### Advanced Simulation Engine
- **Compounding Effects**:
  - SEO: 15% growth per quarter
  - Content Marketing: 12% growth per quarter
  - Email: 10% growth per quarter
  - Partnerships: 14% growth per quarter
- **Diminishing Returns**: Paid ads become less effective over time (saturation model)
- **Hidden Metrics**: Brand Equity and Team Morale influence all outcomes
- **Share of Voice Model**: Market share calculated based on competitive spending
- **Industry-Specific Factors**: Conversion rates, deal sizes, and sales cycles vary by industry

### Performance Tracking
- **Quarterly Results**: Revenue, Profit, Market Share, Customer Satisfaction, Brand Awareness
- **Traffic Source Attribution**: Organic, Paid, Social, Referral, Email
- **Visual Analytics**: Charts and graphs powered by Recharts
- **Progressive Insights**: AI-generated recommendations based on performance

### Final Debrief
- **Strategy Score**: 0-10,000 points based on multiple dimensions
- **Letter Grade**: A+ to F grading system
- **Percentile Ranking**: Compare against other players
- **Performance Radar**: Multi-dimensional performance visualization
- **Strategic Analysis**:
  - Strengths: What you did well
  - Weaknesses: Areas for improvement
  - Recommendations: Specific actions for better performance

### Wildcard Events
- **Industry-Specific Events**: HIPAA changes for Healthcare, GDPR for E-commerce, etc.
- **Competitive Moves**: Price wars, viral campaigns, acquisitions
- **Market Shifts**: Recessions, trending categories, regulatory changes
- **Internal Crises**: Key resignations, website outages, PR disasters
- **Opportunities**: Strategic partnerships, press features, market openings

## Technical Implementation

### Industry Profiles
Each industry has unique characteristics:
- **Healthcare**: High deal size ($45K-$250K), long sales cycle (4-6 months)
- **Legal Services**: High deal size ($25K-$150K), medium sales cycle (2-4 months)
- **E-commerce**: Low deal size ($75-$500), instant sales cycle
- **SaaS**: Medium deal size ($5K-$50K), short sales cycle (1-2 months)
- **Manufacturing**: High deal size ($50K-$500K), long sales cycle (6-12 months)

### Company Size Impacts
- **Startup**: Agile, lower costs, higher risk tolerance
- **SMB**: Balanced resources, moderate risk
- **Enterprise**: Large budgets, established brand, conservative

### Scoring Algorithm
The scoring engine evaluates:
1. **Revenue Score** (0-25 points): Based on revenue growth
2. **Profitability Score** (0-30 points): ROI and profit margins
3. **Market Share Score** (0-20 points): Market penetration
4. **Efficiency Score** (0-15 points): Budget utilization
5. **Strategy Score** (0-10 points): Tactical diversity and compounding strategy use

Total score determines grade and percentile ranking.

## File Structure

```
src/lib/marketing-simulator/
├── types.ts                 # TypeScript interfaces and types
├── industryProfiles.ts      # Industry definitions and multipliers
├── tacticsLibrary.ts        # 22 marketing tactics with ROI data
├── wildcardEvents.ts        # 12 dynamic event scenarios
└── scoringEngine.ts         # Calculation engine for results

src/components/apps/marketing-simulator-game/
├── CompanySetup.tsx         # 3-step setup wizard
├── QuarterlyPlay.tsx        # Tactical selection interface
├── QuarterResults.tsx       # Performance visualization
└── FinalDebrief.tsx         # End-game scorecard

src/components/apps/
└── MarketingSimulatorGame.tsx  # Main game container
```

## Usage

Navigate to `/apps/marketing-simulator-game` to access the simulator.

The game flow:
1. **Setup**: Configure your company (5-10 minutes)
2. **Q1-Q4 Play**: Select tactics each quarter (2-3 minutes per quarter)
3. **Results**: Review performance after each quarter (1-2 minutes)
4. **Debrief**: Comprehensive final analysis (5 minutes)

Total gameplay time: 20-35 minutes

## Educational Value

This simulator teaches:
- **Marketing Mix Optimization**: Balancing different channels
- **Compounding vs. Short-term Tactics**: SEO builds over time, ads are immediate
- **Budget Management**: Allocating resources strategically
- **Industry Context**: Different industries require different approaches
- **Performance Metrics**: Understanding KPIs (ROI, CAC, LTV)
- **Strategic Thinking**: Planning ahead vs. reacting to events

## Future Enhancements

Planned features:
- [ ] A/B Testing Mini-Game
- [ ] Talent Hiring System
- [ ] "Big Bet" Strategic Options
- [ ] Leaderboard System
- [ ] Save/Resume Games
- [ ] Multiplayer Competition
- [ ] Custom Industry Builder
- [ ] PDF Report Export

## Credits

Inspired by the [CMO Simulator](https://github.com/yesmannow/cmo-simulator) project, this implementation brings sophisticated game mechanics to a portfolio demonstration, showcasing expertise in:
- React state management
- Complex business logic
- Data visualization
- TypeScript type safety
- Game design principles
- Marketing strategy knowledge
