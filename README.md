# pillars

A project to track and view my daily activities, split between 7 Pillars.
Each Pillar is a category identified by me as a fundamentally important area of life.

Those Pillars are...
1. Zazen
2. Work
3. Social
4. Learn
5. Bike
6. Eat Well
7. Slack

### Day View - index.html

A table displaying the engagement with the 7 Pillars each day as well as an input form
to add a new entry. Each entry has a start date and time, duration, quality,
and notes field.

### Summary View - summary.html

A table displaying the overall quality of each day as either a yay day, a solid day,
or a wrench to the head day as well an input form to add a new entry. Each entry
has a date, quality, and notes field.

Stephen Colbert and staff would rank each day working on The Colbert Report in this
way and they found there were always more Yays than predicted and less Wrenches than
predicted.

### Charts View - charts.html

A d3.js based stacked bar chart showing the duration of each pillar per day over
the course of a week. Pillars are color-coded. On mouseover the chart displays which
pillar is moused over as well as the duration.
