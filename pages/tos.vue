<template>
  <div class="flex justify-center">

  <div class="win7">
    <div class="window active" style="max-width: 600px ; --w7-w-bg: #805ba5; ">
      <div class="title-bar">
        <div class="title-bar-text">T.O.S</div>
        <div class="title-bar-controls">
        </div>
      </div>
      <div class="window-body has-space">

        <!-- Radio group con opciones para seleccionar idioma -->
        <div style="display: flex; flex-direction: column; gap: 6px">
          <div>
            <input type="radio" id="radio20" name="first-example" value="English" v-model="selectedLanguage" />
            <label for="radio20">English</label>
          </div>
          <div>
            <input type="radio" id="radio21" name="first-example" value="Spanish" v-model="selectedLanguage" />
            <label for="radio21">Spanish</label>
          </div>




        <!-- Texto del idioma -->

<div class="mt-4 text-lg">
  <!-- English List -->
  <div v-if="selectedLanguage === 'English'">
    <ol class="list-decimal list-inside space-y-2">
      <li>I only accept PayPal payments, or if you're from Chile, I accept bank transfers (Banco Santander, MACH, Tenpo, or Falabella).</li>
      <li>I work with full payment (I don't accept 50/50).</li>
      <li>My turnaround time is 1 to 2 months, as I'm studying.</li>
      <li>I don't usually send previews, but you can request it (only applies to prices between $5 and $16).</li>
      <li>For fees or commissions over $20, I send previews (sketch, color) to make the necessary changes. More than 3 modifications will be charged +$5 for each change made.</li>
      <li>I don't give refunds.</li>
      <li>I deliver via means such as Stash (Deviantart) or TH, but you can ask me to send it to you by email.</li>
      <li>Once the work is delivered, I would appreciate it if you could credit me if you publish it.</li>
      <li>Please don't scratch my drawings, scribble, or change the color. I don't mind if you modify the design, but please don't overwrite the drawing I submit.</li>
      <li>Extra note: My style isn't "permanent." Some drawings may undergo slight changes (this doesn't mean the quality will decrease).</li>
    </ol>
  </div>

  <!-- Spanish List -->
  <div v-else-if="selectedLanguage === 'Spanish'">
    <ol class="list-decimal list-inside space-y-2">
      <li>Acepto pago solo en Paypal, o si eres de Chile acepto transferencia (Banco Santander, MACH, Tenpo o Falabella).</li>
      <li>Trabajo con pago completo (no acepto 50/50).</li>
      <li>Mi tiempo de entrega es de 1 a 2 meses, debido a que estoy estudiando.</li>
      <li>No suelo enviar avances, pero puedes solicitarlos (solo aplica a precios de $5 a $16).</li>
      <li>Los costos o comisiones sobre $20, envío avances (sketch, color), para realizar cambios respectivos. Más de 3 modificaciones se cobrará +$5 por cada cambio adicional.</li>
      <li>No hago reembolsos.</li>
      <li>Entrego por medios como Stash (Deviantart) o TH, pero puedes pedirme que te lo envíe por correo.</li>
      <li>Una vez entregado el trabajo, agradecería que me dieras crédito si lo publicas.</li>
      <li>Por favor no rayes mis dibujos, ni hagas garabatos o cambies el color. No me molesta que modifiques el diseño, pero por favor no sobrescribas mi dibujo.</li>
      <li>Dato extra: Mi estilo no es algo “permanente”, algunos dibujos pueden sufrir pequeños cambios (esto no implica que baje la calidad).</li>
    </ol>
  </div>
  
          <div v-else>  
               <ol class="list-decimal list-inside space-y-2">
      <li>I only accept PayPal payments, or if you're from Chile, I accept bank transfers (Banco Santander, MACH, Tenpo, or Falabella).</li>
      <li>I work with full payment (I don't accept 50/50).</li>
      <li>My turnaround time is 1 to 2 months, as I'm studying.</li>
      <li>I don't usually send previews, but you can request it (only applies to prices between $5 and $16).</li>
      <li>For fees or commissions over $20, I send previews (sketch, color) to make the necessary changes. More than 3 modifications will be charged +$5 for each change made.</li>
      <li>I don't give refunds.</li>
      <li>I deliver via means such as Stash (Deviantart) or TH, but you can ask me to send it to you by email.</li>
      <li>Once the work is delivered, I would appreciate it if you could credit me if you publish it.</li>
      <li>Please don't scratch my drawings, scribble, or change the color. I don't mind if you modify the design, but please don't overwrite the drawing I submit.</li>
      <li>Extra note: My style isn't "permanent." Some drawings may undergo slight changes (this doesn't mean the quality will decrease).</li>
    </ol>

              </div>

          </div>
        </div>
      </div>
    </div>
  </div>
  </div>

</template>






<script setup>
import { ref } from 'vue'

const selectedLanguage = ref()








</script>
<style scoped>
@import "7.css/dist/7.scoped.css"
</style>