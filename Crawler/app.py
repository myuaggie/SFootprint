from flask import Flask
from urllib.request import urlopen #用于获取网页
from bs4 import BeautifulSoup #用于解析网页
from flask_cors import CORS
from flask import jsonify
import json

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route('/EENews')
def EENews():
    html = urlopen('http://xsb.seiee.sjtu.edu.cn/')
    bsObj = BeautifulSoup(html, 'html.parser')
    tag_a = bsObj.find_all('a')
    result=[]
    for i in range(41, 45):
        info = dict()
        info['href'] = 'http://xsb.seiee.sjtu.edu.cn/' + tag_a[i].get('href')
        info['title'] = tag_a[i].string
        info['site'] = '电院教务办本科生'
        result.append(info)
    return jsonify(result)

@app.route('/SJTUNews')
def SJTUNews():
    html = urlopen('https://news.sjtu.edu.cn/')
    bsObj = BeautifulSoup(html, 'html.parser')
    tag_a = bsObj.find_all('a', {'class': 'item'})
    tag_title = bsObj.find_all('div', {'class': 'dot'})
    result = []
    title = []
    for i in tag_title:
        title.append(i.string)
    for i in range(0,5):
        info = dict()
        info['href'] = 'https://news.sjtu.edu.cn/'+tag_a[i].get('href')
        info['title'] = title[i]
        info['site'] = '上海交大新闻网'
        result.append(info)

    html2 = urlopen('http://electsys.sjtu.edu.cn/edu/')
    bsObj2 = BeautifulSoup(html2, 'html.parser')
    tag_a2 = bsObj2.find_all('a', {'class': 'news'})
    for i in range(0, 9):
        info = dict()
        info['href'] = tag_a2[i].get('href')
        info['title'] = tag_a2[i].get('title')
        info['site'] = '教学信息服务网'
        result.append(info)
    return jsonify(result)

@app.after_request
def add_header(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type,Authorization'
    return response

if __name__ == '__main__':
    app.run()
