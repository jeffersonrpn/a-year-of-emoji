#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
from bs4 import BeautifulSoup
import requests

r = requests.get('http://localhost:3000/messages.html')
soup = BeautifulSoup(r.text, 'html.parser')
messages = soup.find_all('div', {'class': 'im_message_body'})

csv = open('messages.csv', 'wb')
csv.write('author,emojis')
for message in messages:
    author = message.find('a', {'class': 'im_message_author'}).get_text()
    text = message.find('div', {'class': 'im_message_text'}).get_text()
    try:
        match = re.findall(':[A-z]+:', text)
        emojis = ','.join(match)
    except:
        emojis = ''
    csv.write(author.encode('utf-8')+',"'+emojis+'"\n')
csv.close()
