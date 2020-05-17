<template>
  <validation-provider :rules="rules" v-slot="{ errors }">
    <el-form-item label="频道" size="medium" :required="isRequired">
      <el-select
        clearable
        filterable
        :filter-method="filterChannel"
        :value="localValue"
        @input="updateLocalValue"
        placeholder="请输入关键词进行搜索"
      >
        <el-option
          v-for="ch in options"
          :key="ch.id"
          :value="ch.id"
          :label="ch.name"
        >
          <span>{{ ch.name }} - {{ ch.englishName }}</span>
        </el-option>
      </el-select>
      <app-form-error :error="errors[0]"></app-form-error>
      <app-form-tip>支持中文名、拼音及英文名检索</app-form-tip>
    </el-form-item>
  </validation-provider>
</template>

<style lang="scss" scoped></style>

<script>
import { useFormElement } from '@fext/vue-use';

export default {
  name: 'example-channel',

  props: {
    name: String,
    rules: {
      type: [String, Object]
    },
    value: {
      required: false
    },
    formValues: {
      type: Object,
      required: false
    }
  },

  setup(props, context) {
    const {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    } = useFormElement(props, context);

    return {
      dirty,
      isRequired,
      localValue,
      setInitialValue,
      updateLocalValue
    };
  },

  data() {
    const channels = [
      {
        id: 1,
        name: '电影',
        code: 'dy',
        pinyin: 'dianying',
        englishName: 'movie'
      },

      {
        id: 2,
        name: '电视剧',
        code: 'dsj',
        pinyin: 'dianshiju',
        englishName: 'teleplay'
      },

      {
        id: 3,
        name: '动漫',
        code: 'dm',
        pinyin: 'dongman',
        englishName: 'anime'
      },

      {
        id: 4,
        name: '综艺',
        code: 'zy',
        pinyin: 'zongyi',
        englishName: 'variety show'
      },

      {
        id: 5,
        name: '儿童',
        code: 'et',
        pinyin: 'ertong',
        englishName: 'children'
      }
    ];

    return {
      list: channels,

      options: channels
    };
  },

  methods: {
    filterChannel(word) {
      const like = str => str.startsWith(word);

      if (word) {
        this.options = this.list.filter(ch => {
          return (
            like(ch.name) ||
            like(ch.code) ||
            like(ch.pinyin) ||
            like(ch.englishName)
          );
        });
      } else {
        this.options = this.list;
      }
    }
  }
};
</script>
