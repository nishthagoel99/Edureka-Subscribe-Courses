import requests
import bs4
import mysql.connector
con=mysql.connector.connect(host='localhost',user='root',password='root',db='courses',unix_socket='/Applications/MAMP/tmp/mysql/mysql.sock')
cur= con.cursor()

res=requests.get('https://www.edureka.co/cloudcomputing')
soup=bs4.BeautifulSoup(res.text,'html.parser')
thislist=['curriculum','description','certification','reviews','projects','features','faqs']
for liste in thislist:
	containers=soup.findAll('div',{'id':liste})
	for container in containers:
		print(container)

		title=container.find('h2',{'class':'panel-title'})
		title=title.text.strip()
		print(title)
		data=container.findAll('div',{'class':'panel-default'})
		for do in data:	
			body=do.find('div',{'class':'panel-collapse'})
			mainh=do.find('div',{'class':'panel-heading'})	
			heading=mainh.text.strip()
			if 'Topics:' in body.text:
				objective=body.text.split('Topics:')[0]
				if 'Hands On/Demo:' in body.text:
					topics=body.text.split('Topics:')[1].split('Hands On/Demo:')[0]
					demo=body.text.split('Hands On/Demo:')[1]
				if 'Hands On/Demo:' not in body.text:
					topics=body.text.split('Topics:')[1]
					demo='No demo in Particular'
			if 'Topics:' not in body.text:
				objective=body.text.strip()
			cur.execute(("INSERT INTO aws(Main,Heading,Objective,Topics,Demo) VALUES(%s,%s,%s,%s,%s)"),(title,heading,objective,topics,demo))
									
cur.execute('SELECT * FROM aws')
for y in cur.fetchall():
	print(y);
con.commit()
			


