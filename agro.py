import requests
from bs4 import BeautifulSoup
from flask import Flask

url = "https://economictimes.indiatimes.com/topic/agriculture"
url1 = "https://agmarknet.gov.in/"

r = requests.get(url)
r1 = requests.get(url1)

htmlContent = r.content
htmlContent1 = r1.content

soup = BeautifulSoup(htmlContent,"html.parser")
soup1 = BeautifulSoup(htmlContent1,"html.parser")

# for making api
app = Flask(__name__)

# Scraping all Titles
titles = [] # here Titles

newsTitle = soup.find_all('h2')

for item in range(0,len(newsTitle)-3):
    titles.append(newsTitle[item].get_text())
 

# Scraping all Images
all_Images = []  # here Images

NewsImages = soup.find_all("img", class_="flt")
Images1 = []

for link in NewsImages:
    if(link.get("src") != 'https://economictimes.indiatimes.com/thumb/width-100,height-75,msid-42031747/etlogo.jpg'):
        linkText = (link.get("src"))
        Images1.append(linkText)


NewsImages1 = soup.find_all("img")
Images2 = []

for link in range(0,len(NewsImages1)-8):
    if(NewsImages1[link].get("data-original") != 'https://economictimes.indiatimes.com/thumb/width-100,height-75,msid-42031747/etlogo.jpg' and NewsImages1[link].get("data-original") != None):
        linkText = (NewsImages1[link].get("data-original"))
        Images2.append(linkText)
        

all_Images1 = Images1 + Images2

for img in all_Images1:
    img = img.replace("100", "500")
    img = img.replace("75", "500") 
    all_Images.append(img)   
    
# Scraping all description
all_desc = [] # here description
NewsDesc = soup.find_all("div", class_="syn")

for item in NewsDesc:
    all_desc.append(item.get_text())


# Scraping all date and time
all_time = [] # here date and time
NewsTime = soup.find_all("time")

for item in NewsTime:
    all_time.append(item.get_text())

# Scraping all redirect links
all_links = [] # here redirect links
NewsLink = soup.find_all(itemprop="url") 

for item in range(15,len(NewsLink)):
    if(item%2 == 1):
        linkText = ("https://economictimes.indiatimes.com" + NewsLink[item].get("href"))
        all_links.append(linkText)
    else:
        continue    

# Scraping all commodities
commodities = []
allcommodity = soup1.find(id="ddlCommodity")

for i in allcommodity:
    if(i != '\n'):
        commodities.append(i.get_text())


@app.route("/commodity",methods = ["POST","GET"])
def commodity():
    return {
    "commodities":commodities
}


@app.route("/articles",methods = ["POST","GET"])
def articles():
    return {
    "titles":titles,
    "all_Images":all_Images,
    "all_desc":all_desc,
    "all_time":all_time,
    "all_links":all_links
}

if __name__ == "__main__":
    app.run(debug=True,port=3001)
