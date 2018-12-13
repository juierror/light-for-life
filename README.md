# Light For Life

This is web application for IoT project in 2110366 Embedded System Laboratory Computer Engineering Chulalongkorn University.

## install

```
$ npm install
```

## run

```
$ npm start
```

- You can slide the bar in bottom right windows to adjust light in the room.
- This IoT have 2 mode.
  - Manual
  - AutoDim
- This IoT use netpie microgear to pass data to nodeMCU and nodeMCU will pass this data to stm32 via UART

![NormalPicture](./public/git01.jpg)
This is first scene when you enter application.

![SecondPicture](./public/git01.jpg)
Image will appear when we slide the bar.

![lastPicture](./public/git01.jpg)
The full image when we slide bar to the maximum.
