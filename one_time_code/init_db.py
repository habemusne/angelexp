from triplet.models import Image, Question
import lxml.html
from urllib2 import urlopen
import contextlib

def insert_into_imagedb_2kFemale():
    with contextlib.closing(urlopen('http://52.23.229.132/2kFemale/')) as page_source:
        page_content = page_source.read()
    doc = lxml.html.document_fromstring(page_content)
    image_a_links = doc.xpath('//td/a/@href')
    for image_a_link in image_a_links:
        if not image_a_link.endswith('.jpg'):
            continue
        img_url = 'http://52.23.229.132/2kFemale/' + image_a_link
        Image.objects.create(img_url=img_url)

def init_question():
    Question.objects.create(
        img1='http://52.23.229.132/2kFemale/F1.jpg',
        img2='http://52.23.229.132/2kFemale/F2.jpg',
        img3='http://52.23.229.132/2kFemale/F3.jpg',
    )
