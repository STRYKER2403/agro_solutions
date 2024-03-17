
# Agro Solutions

A platform to help farmers buy necessary commodities  for their yield and and sell it at MSP. Aware them about market prices and agriculture sector news.

Agro Solutions is build with Next.js as frontend and backend. It uses API's and Web scrapping (python) to accomplish its objectives related to data collection.

Users can buy necessary  commodities required for good yield and learn about the process and techniques to have maximum yield. This yield can also be sold when signing up as a merchant. it shows agriculture sector news(web scrapped)  and also can tell rates in mandis of a particular district with a particular commodity.


## Demo Video

[Agro Solutions](https://youtu.be/3BvayDWLq-c)


## Installation

Clone the git repository:

```bash
  git clone https://github.com/STRYKER2403/agro_solutions.git
  cd agro_solutions
```
Install necessary dependencies:

```bash
  yarn add dependencies or yarn install
```
Create an .env file and add the following variables:

```bash
  MONGO_URI = mongodb://localhost:27017/agrosolutions
  NEXT_PUBLIC_HOST = http://localhost:3000
  NEXT_PUBLIC_PAYTM_HOST = ********
  NEXT_PUBLIC_PAYTM_MID = ********
  PAYTM_MKEY = ********
  AES_SECRET = ********
  JWT_SECRET = ********
  OUTLOOK_MAIL = ********
  OUTLOOK_PASSWORD = ********
  DATA_GOV_API_KEY = ********

```

Run development server:

```bash
  yarn both
```


## Usage

1. Navigate your site to ```/signup``` Create an account for yourself (create a merchant account to access all features).

2. From the Home page , navigation to four sections is possible:

- products - buy products.
- articles - latest agriculture news.
- learn - Market trends to know mandi rates.
        Crop plan for various crop information.
- Contact Us - contact section.    

3. my account, my orders and dashboard are accessible from profile icon at top right.Change of password ,order summary and adding,updating of products through dashboard is facilitated by this.


## Screenshots


![Screenshot (182)](https://user-images.githubusercontent.com/75637474/230471758-2b62678e-b884-4a5a-b507-1e5fe30b9c13.png)

![Screenshot (185)](https://user-images.githubusercontent.com/75637474/230472108-0f5d995f-a841-4889-8dea-481b82a4aeb4.png)

![Screenshot (189)](https://user-images.githubusercontent.com/75637474/230472261-543354d6-4ffd-4055-a6ee-4b7db47ba1cb.png)

![Screenshot (202)](https://user-images.githubusercontent.com/75637474/230472293-876c007d-bee1-4657-94b0-a73d5e3ba0c8.png)

![Screenshot (186)](https://user-images.githubusercontent.com/75637474/230472148-9feb9bf5-5632-46bd-9782-24a613ed3e60.png)

![Screenshot (203)](https://user-images.githubusercontent.com/75637474/230472300-37902e2e-5666-42d1-8008-94f4eaef89af.png)

![Screenshot (205)](https://user-images.githubusercontent.com/75637474/230472316-e4df1784-fddc-47c5-9765-02b1a3b296ad.png)

