# PILLARS

A project to track and view my daily activities, split between 7 Pillars.
Each Pillar is a category identified by me as a fundamentally important area of life.

Those Pillars are...
1. Zazen        : Meditation, Buddhism
2. Work         : Any projects for others
3. Social       : Friends, Family
4. Learn        : Any activities related to improving any of the other 6 pillars
5. Bike         : Any activities related to cycling (mostly cycling)
6. Eat Well     : Breakfast Lunch or Dinner with others
7. Slack        : Anything that doesn't fit above. Aspirationally, time for exploring new activities.

### Architecture

Originally this project was built using jQuery, php, jQuery, and MySQL.

jQuery was too basic for most of what I wanted to do so I researched solutions and Angular won out.

Angular manages all views except for the index which is running legacy jQuery.

The site is served up on a VPS using nginx, node, and Express.

### Day View : /

A table displaying the engagement with the 7 Pillars each day as well as an input form
to add a new entry. Each entry has a start date and time, duration, quality,
and notes field.

### Summary View : /summary

A table displaying the overall quality of each day as either a yay day, a solid day,
or a wrench to the head day as well an input form to add a new entry. Each entry
has a date, quality, and notes field.

### Charts View : /charts

Many charts build using D3 on Angular. Check out the annual calendar to see
a familiar sight :)

### Data Explorer : /explorer

A data explorer and associated views of data to see progress in custom defined
parameters.
