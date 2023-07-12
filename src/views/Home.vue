<template>
    <Content>
        <div ref="container" class="homeContainer">
        </div>
    </Content>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GlTFLoader.js';
import Content from '@components/layout/content/Index.vue'
const container = ref<HTMLDivElement | null>(null)

onMounted(() => {
    if (container.value) {
        const scene: THREE.Scene = new THREE.Scene();
        const gltfLoader = new GLTFLoader();

        const url = '@assets/cartoon_lowpoly_small_city_free_pack/scene.gltf';
        gltfLoader.load(url, (gltf) => {
            const root = gltf.scene;
            scene.add(root);
        });
        // const axesHelper = new THREE.AxesHelper(100);
        // axesHelper.position.y = -54
        // scene.add(axesHelper);

        // const gridHelper = new THREE.GridHelper(100, 100);
        // gridHelper.position.y = -54
        // scene.add(gridHelper);
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

        const width: number = container.value.clientWidth; //canvas画布宽度
        const height: number = container.value.clientHeight; //canvas画布高度
        const k: number = width / height; //canvas画布宽高比
        const s: number = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
        //创建相机对象
        const camera: THREE.OrthographicCamera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
        camera.position.set(200, 300, 200); //设置相机位置
        camera.lookAt(scene.position); //设置相机方向(指向的场景对象)

        const renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer();
        renderer.setSize(container.value.clientWidth, container.value.clientHeight);//设置渲染区域尺寸
        renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色

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

        container.value?.appendChild(renderer.domElement);
    }
})
</script>

<style scoped lang="scss">
.homeContainer {
    height: 100%;
    width: 100%;
}
</style>