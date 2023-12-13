<!--This file is part of sisdai-mapas.-->

<!--sisdai-mapas is free software: you can redistribute it and/or modify-->
<!--it under the terms of the GNU Lesser General Public License as published by the-->
<!--Free Software Foundation, either version 3 of the License, or-->
<!--(at your option) any later version.-->

<!--sisdai-mapas is distributed in the hope that it will be useful,-->
<!--but WITHOUT ANY WARRANTY; without even the implied warranty of-->
<!--MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser General-->
<!--Public License for more details.-->

<!--You should have received a copy of the GNU Lesser General Public License along-->
<!--with sisdai-mapas. If not, see <https://www.gnu.org/licenses/>.-->

<template>
  <div class="sisdai-mapa-vista-carga">
    <svg
      width="55"
      height="80"
      viewBox="0 0 55 80"
      xmlns="http://www.w3.org/2000/svg"
      fill="#FFF"
    >
      <g transform="matrix(1 0 0 -1 0 80)">
        <rect
          width="10"
          height="20"
          rx="3"
        >
          <animate
            attributeName="height"
            begin="0s"
            dur="4.3s"
            values="20;45;57;80;64;32;66;45;64;23;66;13;64;56;34;34;2;23;76;79;20"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="15"
          width="10"
          height="80"
          rx="3"
        >
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="80;55;33;5;75;23;73;33;12;14;60;80"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="30"
          width="10"
          height="50"
          rx="3"
        >
          <animate
            attributeName="height"
            begin="0s"
            dur="1.4s"
            values="50;34;78;23;56;23;34;76;80;54;21;50"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
        <rect
          x="45"
          width="10"
          height="30"
          rx="3"
        >
          <animate
            attributeName="height"
            begin="0s"
            dur="2s"
            values="30;45;13;80;56;72;45;76;34;23;67;30"
            calcMode="linear"
            repeatCount="indefinite"
          />
        </rect>
      </g>
    </svg>
  </div>
</template>

<style lang="scss" scoped>
.sisdai-mapa-vista-carga {
  background: rgba(0, 0, 0, 0.2);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
