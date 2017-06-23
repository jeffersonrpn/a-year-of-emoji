#!/usr/bin/env python
# -*- coding: utf-8 -*-
import re
from bs4 import BeautifulSoup
import requests

r = requests.get('http://localhost:3000/')
soup = BeautifulSoup(r.text, 'html.parser')
messages = soup.find_all('div', {'class': 'im_history_message_wrap'})

html = open('messages.html', 'wb')
for message in messages:
    html.write(str(message))
html.close()
