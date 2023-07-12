import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene: THREE.Scene = new THREE.Scene();
const geometry: THREE.BoxGeometry = new THREE.BoxGeometry(100, 100, 100); //创建一个立方体几何对象Geometry
const material: THREE.MeshBasicMaterial = new THREE.MeshLambertMaterial({
    color: 0x0000ff
}); //材质对象Material
const mesh: THREE.Mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
scene.add(mesh); //网格模型添加到场景中
/**
 * 光源设置
 */
//点光源
const point: THREE.PointLight = new THREE.PointLight(0xffffff);
point.position.set(400, 200, 300); //点光源位置
scene.add(point); //点光源添加到场景中
//环境光
const ambient: THREE.AmbientLight = new THREE.AmbientLight(0x444444);
scene.add(ambient);
/**
 * 相机设置
 */
const width: number = 600; //canvas画布宽度
const height: number = 800; //canvas画布高度
const k: number = width / height; //canvas画布宽高比
const s: number = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
//创建相机对象
const camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
camera.position.set(200, 300, 200); //设置相机位置
camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
/**
 * 创建渲染器对象
 */
const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
renderer.setSize(width, height);//设置渲染区域尺寸
renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

// 渲染函数
function render(): void {
    renderer.render(scene, camera);//执行渲染操作
    //mesh.rotateY(0.01);//每次绕y轴旋转0.01弧度
    requestAnimationFrame(render);//请求再次执行渲染函数render，渲染下一帧
}
render();

//创建控件对象  相机对象camera作为参数   控件可以监听鼠标的变化，改变相机对象的属性
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0, 0);
controls.update();

export { renderer };