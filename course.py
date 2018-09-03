import bs4
import requests
import mysql.connector
res=requests.get('https://www.edureka.co')
soup=bs4.BeautifulSoup(res.text,'html.parser')
c=soup.find('section',{'class':'trendingmain'})
coursetiles=c.findAll('a',{'class':'homecardmain'}) 
print(coursetiles)
count=0
courserating=0
con=mysql.connector.connect(host='localhost' ,password='root',user='root',database="courses",unix_socket='/Applications/MAMP/tmp/mysql/mysql.sock') #connecting with the database
cur=con.cursor()
print('hey')
for x in coursetiles:
	coursetitle=x.find('h3',{'class':'coursetitle'})
	coursetitle=coursetitle.string.strip() #removing the unwanted spaces 
	print(coursetitle)

	courseratings=x.find('div',{'class':'reviewicons'})
	courserating=courseratings.find('span',{'class':'rating'})
	print(courserating)
	courserating=courserating.string.strip()
	print(courserating)

	coursevalues=x.find('div',{'class':'courseprsec'})
	courseval=coursevalues.find('span',{'class':'actualpr'})

	for c in courseval:
		coursevalue=c.string.strip()
		print(coursevalue)
	courseimages=x.find('div',{'class':'courseimgmain'})
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
