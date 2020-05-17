<template>
  <div>
    <validation-observer ref="observer" v-slot="{ invalid }">
      <el-form class="app-basic-form" label-width="200px" v-loading="loading">
        <el-card header="基础信息">
          <example-id
            v-color
            v-if="exampleId"
            v-model="formValues.id"
          ></example-id>
          <example-clock v-color="'#737373'"></example-clock>
          <example-channel
            :rules="{ required: true }"
            v-model="formValues.channel"
          ></example-channel>
          <example-name
            :rules="{ required: true }"
            v-model="formValues.name"
          ></example-name>
          <example-short-name
            :rules="{ required: true, max: 20 }"
            :formValues="formValues"
            v-model="formValues.shortName"
          ></example-short-name>
          <example-time
            :rules="{ required: true, afterNow: 30 }"
            v-model="formValues.time"
          ></example-time>
        </el-card>
        <el-card header="高级编目">
          <example-recommended v-model="formValues.recommended">
          </example-recommended>
          <example-recommend-rate
            :formValues="formValues"
            v-model="formValues.recommendRate"
          >
          </example-recommend-rate>
          <example-tag
            :rules="{ required: !!formValues.recommended }"
            v-model="formValues.tag"
          ></example-tag>
          <example-type v-model="formValues.type"></example-type>
          <example-category v-model="formValues.category"></example-category>
          <example-actor-complex v-model="formValues.actor">
          </example-actor-complex>
          <example-description v-model="formValues.description">
          </example-description>
        </el-card>

        <app-form-action>
          <el-button :disabled="loading" type="primary" @click="save">
            提交
          </el-button>
        </app-form-action>
      </el-form>
    </validation-observer>
  </div>
</template>

<style lang="scss" scoped></style>

<script>
import { useForm, useLoading } from '@fext/vue-use';
import ExampleFormComponents from './components';

export default {
  name: 'example-basic-form',

  components: {
    ...ExampleFormComponents
  },

  setup() {
    const { formValues, updateFormValues } = useForm();
    const { loading, withLoading } = useLoading();

    return {
      // from form composition
      formValues,
      updateFormValues,

      // from loading composition
      loading,
      withLoading
    };
  },

  data() {
    return {};
  },

  computed: {
    exampleId() {
      return this.$route.params.id;
    }
  },

  created() {
    this.getFormValues();
  },

  methods: {
    getInitialValues() {
      return {
        type: 2
      };
    },

    getFormValues(data) {
      if (this.exampleId) {
        this.withLoading(() => {
          return this.$services.exampleEntityService
            .fetchExampleClientEntity({
              id: this.exampleId
            })
            .then(data => {
              this.updateFormValues(data);
            })
            .catch(err => {
              this.$message({
                type: 'error',
                duration: 5000,
                message: `获取表单数据失败，错误详情 - ${err.message}`
              });
            });
        });
      } else {
        this.updateFormValues(this.getInitialValues());
      }
    },

    async save() {
      const valid = await this.$refs.observer.validate();

      if (!valid) {
        this.$message({
          type: 'error',
          message: '部分表单填写错误，请检查！'
        });
        return;
      }

      this.withLoading(async () => {
        try {
          await this.$services.exampleEntityService.saveExampleServerEntity(
            this.formValues
          );
          this.$message({
            type: 'success',
            message: '保存成功！请查看控制台输出'
          });

          this.$closeView().then(() => {
            this.$router.push('/table/basic/query');
          });
        } catch (err) {
          this.$message({
            type: 'error',
            message: '保存失败！'
          });
        }
      });
    }
  }
};
</script>
