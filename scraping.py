#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
from bs4 import BeautifulSoup
import requests

r = requests.get('http://localhost:3000/messages.html')
soup = BeautifulSoup(r.text, 'html.parser')
messages = soup.find_all('div', {'class': 'im_history_message_wrap'})

csv = open('messages.csv', 'wb')
csv.write('author,emojis,date,time\n')
messageDate = ''
for message in messages:
    author = message.find('a', {'class': 'im_message_author'})
    if author:
        messageAuthor = author.get_text()
    else:
        messageAuthor = "ERROR"
    text = message.find('div', {'class': 'im_message_text'})
    if text:
        messageText = text.get_text()
    else:
        messageText = "ERROR MSG"
    date = message.find('span', {'class': 'im_message_date_split_text'})
    if date:
        messageDate = date.get_text()
    time = message.find('span', {'ng-bind': '::historyMessage.date | time'})
    if time:
        messageTime = time.get_text()
    try:
        match = re.findall(':[A-z]+:', messageText)
        emojis = ','.join(match)
    except:
        emojis = ''
    if emojis:
        csv.write(messageAuthor.encode('utf-8')+',"'+emojis+'","'+messageDate.encode('utf-8')+'",'+messageTime.encode('utf-8')+'\n')
csv.close()
