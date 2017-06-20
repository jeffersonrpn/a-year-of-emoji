#!/usr/bin/env python
# -*- coding: utf-8 -*-
import sys
from bs4 import BeautifulSoup
import requests

r = requests.get('http://localhost:3000/messages.html')
soup = BeautifulSoup(r.text, 'html.parser')
messages = soup.find_all('div', {'class': 'im_message_body'})

csv = open('messages.csv', 'wb')
for message in messages:
    autor = message.find('a', {'class': 'im_message_author'}).get_text()
    text = message.find('div', {'class': 'im_message_text'}).get_text()
    csv.write(autor.encode('utf-8')+', '+text.encode('utf-8')+'\n')
csv.close()
