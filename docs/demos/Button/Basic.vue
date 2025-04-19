<script setup>
import Button from '@/components/Button/Button.vue'
</script>

<template>
  <div class="mb-4">
    <Button>Default</Button>
    <Button type="primary">
      Primary
    </Button>
    <Button type="success">
      Success
    </Button>
    <Button type="info">
      Info
    </Button>
    <Button type="warning">
      Warning
    </Button>
    <Button type="danger">
      Danger
    </Button>
  </div>

  <div class="mb-4">
    <Button plain>
      Plain
    </Button>
    <Button type="primary" plain>
      Primary
    </Button>
    <Button type="success" plain>
      Success
    </Button>
    <Button type="info" plain>
      Info
    </Button>
    <Button type="warning" plain>
      Warning
    </Button>
    <Button type="danger" plain>
      Danger
    </Button>
  </div>

  <div class="mb-4">
    <Button round>
      Round
    </Button>
    <Button type="primary" round>
      Primary
    </Button>
    <Button type="success" round>
      Success
    </Button>
    <Button type="info" round>
      Info
    </Button>
    <Button type="warning" round>
      Warning
    </Button>
    <Button type="danger" round>
      Danger
    </Button>
  </div>

  <div>
    <Button icon="magnifying-glass" circle />
    <Button type="primary" icon="pen-to-square" circle />
    <Button type="success" icon="check" circle />
    <Button type="info" icon="envelope" circle />
    <Button type="warning" icon="star" circle />
    <Button type="danger" icon="trash-can" circle />
  </div>
</template>

<style>
.mb-4 {
  margin-bottom: 1rem;
}
</style>
