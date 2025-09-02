<template>
  <div class="flex justify-center items-center gap-6 max-w-6xl mx-auto my-12 px-4">


    <!-- Card retro de windows 7 -->
 

    <div class="win7">
      <div class="window active" style="max-width: 300px; --w7-w-bg: #805ba5;">

        <div class="title-bar">
          <div class="title-bar-text">You have a message!</div>

        </div>
        <div class="window-body has-space p-4">
          <div class="p-4">
            Thanks for visiting my page, you can see more information clicking the button below
          </div>
          <section style="display: flex; justify-content: flex-end; gap: 6px">

            <button class="default">

              <NuxtLink to="/design">
                See my work 💖
              </NuxtLink>
            </button>
               <button class="default">

              <NuxtLink to="/tos">
                Go to T.O.S!
              </NuxtLink>
            </button>
          </section>

        </div>
      </div>
    </div>
    <!-- IMAGEN (afuera del card) -->
   <div class="flex justify-center items-center">
      <img src="/images/misc/Home First Drawing.gif" alt="Furry Chibi"
        class="h-[450px] object-contain rounded-2xl drop-shadow-2xl"  />
    </div>
  </div>
</template>


<style scoped>
@import "7.css/dist/7.scoped.css"
</style>
