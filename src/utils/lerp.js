/**
 * 插值工具函数
 * 传入一个目标值，然后会循环调用初始化中传入的 poster 函数，返回生成的中间值
 * 使用方式
 * 1. 初始化
 * const lerp = new Lerp({
 *     data: {x: 0, y: 0},
 *     poster: (curr, diff) => {}
 * })
 * 2. 启动
 * lerp.go({
 *     x: imgPosX,
 *     y: imgPosY
 * })
 * 3. 中断
 * lerp.stop()
 **/

export default class Lerp {

	constructor({ data, poster }) {
		// 是否正在执行插值循环
		this.looping = false
		// 目标池
		this.pool = data || { value: 0 }
		// 当前值
		this.current = data || { value: 0 }
		// 发送器
		this._postValue = poster || this._postValue
        // 插值系数
        this.attr = 0.25
		// 定时器引用
		this._timer = null
	}

	// *******
	// 接口方法
	// *******
	// 启动循环
	to = ({ data, before, after, attr }) => {
		// 更新参数
		this.pool = data || this.pool
        // 前置与后置函数
        this._before = before || this._before
		this._after = after || this._after
        // 插值系数
        this.attr = attr || this.attr
		// 启动循环
		this._startLoop()
	}
	// 终止循环
	stop = this._stopLoop

	// *******
	// 内部方法
	// *******
	// 执行循环
	_startLoop = () => {
        this._before()
		!this.looping && this._runLoop()
		this.looping = true
	}
	_runLoop = () => {
		this._timer = window.requestAnimationFrame(this._loop)
	}
	_loop = () => {
		// 插值
		const pulse = {}
		for(let key in this.pool) {
			pulse[key] = this._lerp(this.current[key], this.pool[key])
		}
		// 更新当前值
		for(let key in this.current) {
			this.current[key] += pulse[key]
		}
		// 发送计算结果
		this._postValue(this.current, pulse)

		// 根据处理结果选择是否需要继续迭代
		let needLoop = false
		for(let key in this.current) {
			if(Math.abs(this.pool[key] - this.current[key]) > 0.001) {
				needLoop = true
			}
		}
		needLoop ? this._runLoop() : this._stopLoop()
	}
	_stopLoop = () => {
		this.looping && window.cancelAnimationFrame(this._timer)
		this.looping = false
		this._after()
	}

	// *******
	// 插值函数
	// *******
	// 线性插值
	_lerp = (src, dest) => {
		return (dest - src) * this.attr
	}

	// *******
	// 重载函数
	// *******
	// 发送器
	_postValue = (curr, diff) => {}
	// 前置函数
	_before = () => {}
	// 后置函数
	_after = () => {}
}