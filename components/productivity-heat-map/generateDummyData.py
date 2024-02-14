import random

colors = ['#97C5EF', '#759FF0', '#4659AD']
f = open('DummyData.tsx', 'a')
f.write('export const dummyData = [')
for i in range(28):
    color = random.choice(colors)
    s = '{\ncolor: "'+color+'",\n},\n'
    f.write(s)
f.write(']')
f.close()