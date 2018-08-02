import bs4;
import requests
import mysql.connector
res=requests.get('https://www.edureka.co')
soup=bs4.BeautifulSoup(res.text,'html.parser')
coursetiles=soup.findAll('div',{'class':'course_tile'}) 
count=0
courserating=0

con=mysql.connector.connect(host='localhost' ,password="",user="root",database="courses") #connecting with the database
cur=con.cursor()

for x in coursetiles:
	coursetitle=x.find('div',{'class':'course_title'})
	coursetitle=coursetitle.string.strip() #removing the unwanted spaces 
	courseratings=x.find('div',{'class':'course_rating'})
	stars=courseratings.findAll('i',{'class':'fa fa-star icon-fa-star-full'})
	for star in stars:
		courserating=courserating+1
	coursevalues=x.find('div',{'class':'course_value'})
	courseval=coursevalues.find('span',{'class':'after_discount'})

	for c in courseval:
		coursevalue=c.string.strip()

	courseimages=x.find('div',{'class':'course_graphic'})
	images=courseimages.findAll('img')
	for alt in images:
		courseimage=alt.get('data-src')
	cur.execute(('INSERT INTO edureka(CourseTitle,CourseRating,CourseValue,CourseImage) VALUES(%s,%s,%s,%s)'),
		(coursetitle,courserating,coursevalue,courseimage))
	courserating=0

cur.execute('SELECT * FROM edureka')
for t in cur.fetchall():
	print(t)
con.commit() #commiting the changes to the database
