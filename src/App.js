import React from "react"
import socketIOClient from "socket.io-client"
import AppReloader from "./Utilities/AppReload"
import Thermostat from './Thermostat/Thermostat'
import Outdoor from './Outdoor/Outdoor'
import Indoor from './Indoor/Indoor'
import ConfigRoom from "./Utilities/ConfigRoom"
import MotionPIR from "./MotionPIR/MotionPIR"
import DateTime from './Utilities/DateTimeMoment'
import DayNight from './Utilities/DayNight'
import TempFC from './Utilities/Temperature_F_C'
import QRcode from './Modal/QR_PopUp'
import OneWireTemp from './Utilities/One_Wire'
import Backlight from "./Utilities/Backlight"

const socket = socketIOClient()

class App extends React.Component {
   constructor(props) {
      super(props)
      this.state = { theme: "day", temp: "F" }
      this.toggleTemp = this.toggleTemp.bind(this)
      this.toggleTheme = this.toggleTheme.bind(this)
   }

   toggleTemp() {
      const temp = this.state.temp === "F" ? "C" : "F"
      this.setState({ temp })
      document.documentElement.setAttribute("data-temp", temp)
   }

   toggleTheme() {
      const theme = this.state.theme === "day" ? "night" : "day"
      this.setState({ theme })
      const bright = this.state.theme === "day" ? "30" : "180"
      socket.emit('Get_BackLight')
      socket.emit('Set_Brightness', bright )
      socket.emit('Get_BackLight')
      console.log('Day_Night: ' + theme)
      document.documentElement.classList.add("color-theme-in-transition")
      document.documentElement.setAttribute("data-theme", theme)
      window.setTimeout(() => {
         document.documentElement.classList.remove("color-theme-in-transition")},1000)
   }

   render() {
      return (
         <React.Fragment>
            <div className="App">
               <div className="grid-container">
                  <div className="touchscreen">
                     <div className="top-tab">
                        <div className="tab1">
                           <QRcode/>
                           <DayNight toggleTheme={this.toggleTheme} Day={this.state.theme}/>
                           <TempFC toggleTemp={this.toggleTemp } F={this.state.temp}/>
                        </div>
                        <div className="tab2">tab_2</div>
                        <div className="tab3">tab_3</div>
                        <div className="tab4">tab_4</div>
                     </div>
                     <div className="main">
                        <div className="outdoor">
                           <div className="out_date">
                              <b><DateTime format={"ddd, MMM Do YYYY"}/></b>
                           </div>
                           <div className="out_time">
                              <b><DateTime format={" h:mm a"}/></b>
                           </div>
                           <div className="out_text">OUTDOOR</div>
                           <div className="h_line"> </div>

                           <Outdoor temp_F_C = {this.state.temp}/>

                           <div className="status">STATUS</div>
                           <div className="h_line"> </div>
                        </div>
                        <div>
                           <Indoor temp_F_C={this.state.temp}/>
                        </div>
                        <div className="set_temp">
                           <Thermostat day={this.state.theme} temp_F_C={this.state.temp}/>
                        </div>
                     </div>
                     <div className="footer">
                        <div className="footer_left">
                           <ConfigRoom/>
                           <MotionPIR/>
                           <OneWireTemp/>
                           <Backlight/>
                           <AppReloader/>
                        </div>
                        <div className="footer_right">footer_right...</div>
                     </div>
                  </div>
               </div>
            </div>
         </React.Fragment>
      )
   }
}
export default App

//  < Indoor day={this.state.temp}/> ...contains: <Windows />
