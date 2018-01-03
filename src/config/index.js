/**
 * 定义基本的 Image 参数类型
 **/

// React Libs
import PropTypes from 'prop-types';

// 默认的图片参数类型
export const imageType = PropTypes.shape({
    src: PropTypes.string,  // 图片链接
    alt: PropTypes.string,  // 同 img 标签的 alt
    text: PropTypes.string, // 图片描述文字
})