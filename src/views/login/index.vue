<template>
  <div class="view-account">
    <div class="view-account-container">
      <div class="view-account-top">
        <div class="view-account-top-desc">
          {{ websiteConfig.loginDesc }}
        </div>
      </div>
      <div class="view-account-form">
        <n-form
          ref="formRef"
          label-placement="left"
          size="large"
          :model="formInline"
          :rules="rules"
        >
          <n-form-item path="username">
            <n-input
              v-model:value="formInline.username"
              placeholder="请输入用户名"
            >
              <template #prefix>
                <n-icon
                  size="18"
                  color="#808695"
                >
                  <PersonOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>
          <n-form-item path="password">
            <n-input
              v-model:value="formInline.password"
              type="password"
              show-password-on="click"
              placeholder="请输入密码"
            >
              <template #prefix>
                <n-icon
                  size="18"
                  color="#808695"
                >
                  <LockClosedOutline />
                </n-icon>
              </template>
            </n-input>
          </n-form-item>

          <n-form-item>
            <n-button
              type="primary"
              size="large"
              :loading="loading"
              block
              @click="handleSubmit"
            >
              登录
            </n-button>
          </n-form-item>
        </n-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from "vue"
import { websiteConfig } from "@/config/website.config"
// import { useMessage } from "naive-ui"
import { useUserStore } from "@/store/modules/user"
import { useRoute, useRouter } from "vue-router"
import { ResultEnum } from "@/enums/httpEnum"
import { PageEnum } from "@/enums/pageEnum"

interface FormState {
  username: string
  password: string
}

const formRef = ref()
// const message = useMessage()
// const autoLogin = ref(true)
const loading = ref(false)
const LOGIN_NAME = PageEnum.BASE_LOGIN_NAME

const formInline = reactive({
  username: "admin",
  password: "admin",
})

const rules = {
  username: { required: true, message: "请输入用户名", trigger: "blur" },
  password: { required: true, message: "请输入密码", trigger: "blur" },
}

const userStore = useUserStore()
const router = useRouter()
const route = useRoute()

const handleSubmit = (e: any) => {
  e.preventDefault()
  formRef.value.validate(async (errors: any) => {
    if (!errors) {
      const { username, password } = formInline
      // message.loading("Loging...")
      loading.value = true

      const params: FormState = {
        username,
        password,
      }

      try {
        const { status } = await userStore.login(params)
        if (status == ResultEnum.SUCCESS) {
          const toPath = decodeURIComponent(
            (route.query?.redirect || "/") as string,
          )
          if (route.name === LOGIN_NAME) {
            router.replace("/")
          } else {
            router.replace(toPath)
          }
        }
      } finally {
        loading.value = false
      }
    }
  })
}
</script>

<style lang="less" scoped>
.view-account {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: auto;

  &-container {
    flex: 1;
    padding: 32px 12px;
    max-width: 384px;
    min-width: 320px;
    margin: 0 auto;
  }

  &-top {
    padding: 32px 0;
    text-align: center;

    &-desc {
      font-size: 14px;
      color: #808695;
    }
  }

  &-other {
    width: 100%;
  }

  .default-color {
    color: #515a6e;

    .ant-checkbox-wrapper {
      color: #515a6e;
    }
  }
}

@media (min-width: 768px) {
  .view-account {
    background-image: url("../../assets/images/login.svg");
    background-repeat: no-repeat;
    background-position: 50%;
    background-size: 100%;
  }

  .page-account-container {
    padding: 32px 0 24px 0;
  }
}
</style>
