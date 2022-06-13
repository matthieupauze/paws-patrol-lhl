import requests
import random
import time, threading
from datetime import datetime

imei = random.randrange(10000, 99999)

intervalLength = input('Interval Length: ')
if intervalLength == '':
    intervalLength = 15
intervalLength = int(intervalLength)

totalLength = input('Total Run Time: ')
if totalLength == '':
    totalLength = 600
totalLength = int(totalLength)

print(f"Running every {intervalLength} seconds for {totalLength} seconds.")

StartTime=time.time()

def action() :

    url = f'http://localhost:3000/api/{imei}'
    data = {'lat': 1.1111, 'long': 2.2222, 'time': datetime.now()}

    x = requests.post(url, data = data)

    print(x.text)
    print('action ! -> time : {:.1f}s'.format(time.time()-StartTime))

class setInterval :
    def __init__(self,interval,action) :
        self.interval=interval
        self.action=action
        self.stopEvent=threading.Event()
        thread=threading.Thread(target=self.__setInterval)
        thread.start()

    def __setInterval(self) :
        nextTime=time.time()+self.interval
        while not self.stopEvent.wait(nextTime-time.time()) :
            nextTime+=self.interval
            self.action()

    def cancel(self) :
        self.stopEvent.set()

inter=setInterval(intervalLength, action)
print('just after setInterval -> time : {:.1f}s'.format(time.time()-StartTime))

t=threading.Timer(totalLength, inter.cancel)
t.start()