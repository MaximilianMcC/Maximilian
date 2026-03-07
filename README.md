This is my personal website

https://maximilian.co.nz


## Ideas
- Good Lemony Font on the L&P page (show collection + write about history)
- Put a picture of L&P bottles on the L&P banner
- Thing speaking about how I speak (emoji rules and styles and stuff)
- Different london underground tile designs on railway 200 thing and railway 200 colors (white and red)
- Books thing that looks like an actual library
- Image of a phone in the margin and it will randomly ring and you can click on it to pick up and hear some voice or music or something
- 3d art gallery where you can walk around
- flashing new sticker on interests and pages (make it dynamiclly disapear after 1 week)
- 503 Service Unavailable picmix (under constrction for stuff ive not done)
- photographs of greggs photos in the margin
- union jacks and welsh flags and stuff on the railway 200 trip + write about the actual countires (like greggs and stuff)
- say how packed the schedule was and how it was cool to do something i wanted to do (instead of being dragged along on parents thing)
- little raylib game embedded on the programming page where you are c# and have to destroy python or something idk
- dynamic changelog that's read from a json file
- thing where i do <DISCORD> and it makes a tooltip that says dm and has my discord
- rename home.scss because its gonna be used for articles
- on right of railway 200 have photos of tickets and stuff

for dynamic nav and stuff do this in `pages.json`
```json
[
	{
		"type": "article",
		"displayName": "railway 200",
		"link": "/articles/railway200",
		"showInSideNavBar": true,
		"dateAdded": "YYYY-MM-DDTHH:mm:ssZ"
	},
	{
		"type": "interest",
		"link": "/interests/programming",
		"banner-name": "programming",
		"showOnHomepage": true,
		"dateAdded": "YYYY-MM-DDTHH:mm:ssZ"
	}
]
```
the dateAdded thing is used for showing the 'new' thingy on the link (up to one/two weeks after was added)