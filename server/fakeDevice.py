import requests
import random
import time, threading
from datetime import datetime

imei = random.randrange(10000, 99999)
coordList = [
    [43.57702250878536, -80.26393192432224],
    [43.576716844259394, -80.26433730441174],
    [43.57635424021159, -80.26483368819483],
    [43.57597964696018, -80.26536316423011],
    [43.575608048152404, -80.26522665868977],
    [43.57548218352021, -80.26461031549243],
    [43.57588674747323, -80.2640394741419],
    [43.57613847478334, -80.26370441508833],
    [43.57643515204788, -80.26330317153032],
    [43.57682172932061, -80.2635554999534]
    ]

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

def action(currentLocation) :

    url = f'http://localhost:3000/api/{imei}'
    data = {'lat': coordList[currentLocation % 10][0], 'long': coordList[currentLocation % 10][1], 'time': datetime.now()}

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
        currentLocation = 10
        while not self.stopEvent.wait(nextTime-time.time()) :
            nextTime+=self.interval
            self.action(currentLocation)
            currentLocation+=1

    def cancel(self) :
        self.stopEvent.set()

inter=setInterval(intervalLength, action)
print('just after setInterval -> time : {:.1f}s'.format(time.time()-StartTime))

t=threading.Timer(totalLength, inter.cancel)
t.start()