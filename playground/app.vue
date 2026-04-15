<template>
  <div
    style="
      width: 90%;
      max-width: 662px;
      margin: 50px auto;
      display: flex;
      flex-direction: column;
      gap: 20px;
    "
  >
    <div>Nuxt module playground!</div>

    <div ref="elref">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis ex
      laboriosam expedita, quaerat officia minus repellat consectetur deserunt
      vel sed ipsa veritatis quos corporis? Soluta, atque cumque! Dicta, iste
      mollitia. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nobis
      ex laboriosam expedita, quaerat officia minus repellat consectetur
      deserunt vel sed ipsa veritatis quos corporis? Soluta, atque cumque!
      Dicta, iste mollitia.
    </div>

    <div
      v-for="i in 3"
      :key="i"
      v-reveal="'fade-up'"
    >
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error a dolore
      assumenda consectetur, ex incidunt, sapiente officia totam, temporibus
      dicta quia beatae! Consequuntur ad corporis illo! Neque ea dolore modi!
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
      reiciendis repellendus ea tempore nostrum. Quasi sed quae aspernatur
      libero explicabo deleniti sunt illum ex. Voluptate voluptatibus ad
      voluptatem temporibus totam. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Blanditiis reiciendis repellendus ea tempore nostrum.
      Quasi sed quae aspernatur libero explicabo deleniti sunt illum ex.
      Voluptate voluptatibus ad voluptatem temporibus totam. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Blanditiis reiciendis repellendus
      ea tempore nostrum. Quasi sed quae aspernatur libero explicabo deleniti
      sunt illum ex. Voluptate voluptatibus ad voluptatem temporibus totam.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
      reiciendis repellendus ea tempore nostrum. Quasi sed quae aspernatur
      libero explicabo deleniti sunt illum ex. Voluptate voluptatibus ad
      voluptatem temporibus totam. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Blanditiis reiciendis repellendus ea tempore nostrum.
      Quasi sed quae aspernatur libero explicabo deleniti sunt illum ex.
      Voluptate voluptatibus ad voluptatem temporibus totam. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Blanditiis reiciendis repellendus
      ea tempore nostrum. Quasi sed quae aspernatur libero explicabo deleniti
      sunt illum ex. Voluptate voluptatibus ad voluptatem temporibus totam.
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
      reiciendis repellendus ea tempore nostrum. Quasi sed quae aspernatur
      libero explicabo deleniti sunt illum ex. Voluptate voluptatibus ad
      voluptatem temporibus totam. Lorem ipsum dolor sit amet consectetur
      adipisicing elit. Blanditiis reiciendis repellendus ea tempore nostrum.
      Quasi sed quae aspernatur libero explicabo deleniti sunt illum ex.
      Voluptate voluptatibus ad voluptatem temporibus totam. Lorem ipsum dolor
      sit amet consectetur adipisicing elit. Blanditiis reiciendis repellendus
      ea tempore nostrum. Quasi sed quae aspernatur libero explicabo deleniti
      sunt illum ex. Voluptate voluptatibus ad voluptatem temporibus totam.
    </div>

    <div
      v-reveal-group="'fade-up'"
      style="
        display: grid;
        gap: 20px;
        grid-template-columns: repeat(2, minmax(0, 1fr));
      "
    >
      <div
        v-for="i in 5"
        :key="i"
        reveal-item
      >
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error a dolore
        assumenda consectetur, ex incidunt, sapiente officia totam, temporibus
        dicta quia beatae! Consequuntur ad corporis illo! Neque ea dolore modi!
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
        reiciendis repellendus ea tempore nostrum. Quasi sed quae aspernatur
        libero explicabo deleniti sunt illum ex. Voluptate voluptatibus ad
        voluptatem temporibus totam. Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Blanditiis reiciendis repellendus ea tempore nostrum.
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const elref = useTemplateRef("elref");
useReveal(elref, { preset: "fade-down" });
</script>
