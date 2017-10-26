/**
 * 名称: HMR入口
 * 用途: 用于承载 React Hot Loader, 实际的 APP 入口位于 app.js 中
 **/

// React Libs
import React from 'react'
import ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
// App Entry
import Components from '@/index'

const render = (Components) =>
    ReactDOM.render(
        <AppContainer>
	        <div>
		        <Components
			        src="https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a4cdd56119387.59a0f4e69a7c4.jpg"
			        alt="撒旦法师打发送达方式大法师打发"
			        text=" isions when a React compone"
			        imageSet={[
				        {
					        src: "https://mir-s3-cdn-cf.behance.net/project_modules/fs/7a4cdd56119387.59a0f4e69a7c4.jpg",
					        alt: "UI Interactions of the week",
					        text: "Book animation design by GISION for Norde",
				        },
				        {
					        src: "https://cdn-images-1.medium.com/max/1600/1*ISt9lZaJ1oFYLXudAGz1NA.gif",
					        alt: "UI Interactions of the week",
					        text: "Vua. by Giga Tamarashvili",
				        },
				        {
					        src: "https://cdn-images-1.medium.com/max/1600/1*x5DZWIUFoHFmBqsNTfV9Zw.gif",
					        alt: "UI Interactions of the week",
					        text: "Nike Interaction concept by Best Served Bold for Green Chameleon",
				        },
				        {
					        src: "https://cdn-images-1.medium.com/max/1600/1*cfTdMQcfsDxV0n3UVubaeg.gif",
					        alt: "UI Interactions of the week",
					        text: "Onboarding by Luobing for Superior",
				        },

			        ]}
			        style={{ width: 400 }}
		        />
	        </div>
        </AppContainer>,
        document.querySelector('#app')
    )
render(Components)

if (module.hot) {
    module.hot.accept('@/index', () => {
        const NextApp = require('@/index')
        render(NextApp)
    })
}