<template>
  <div class="add">
      <h2>添加监控</h2>
      <ul>
        <li>
            <span>监控名称：</span>
            <Input v-model="form.title" placeholder="请输入监控名称" style="width: 400px"></Input>
        </li>
        <li>
            <span>监控描述：</span>
            <Input v-model="form.des" placeholder="请输入监控描述" style="width: 400px"></Input>
        </li>
        <li>
            <span>网址：</span>
        	<Input v-model="form.url" placeholder="http://www.baidu.com" style="width: 400px"></Input>
        </li>
        <li>
            <span>类型：</span>
        	<Select v-model="form.status" style="width:400px">
        	    <Option  :value="1">400系</Option>
        	    <Option  :value="2">500系</Option>
        	    <Option  :value="3">400和500系</Option>
        	</Select>
        </li>
        <li>
            <Button class="submit" @click="submit" type="success">确定添加</Button>
        </li>
      </ul>
  </div>
</template>

<script>
import _ from 'lodash';
export default {
  data () {
    return {
      form: {
        title: '',
        des: '',
      	url: '',
      	status: ''
      }
    }
  },
  methods : {
    submit () {
        let canSubmit = true;
        _.forEach(this.form, (n, key) => {
            if(this.form[key] === '') {
                alert('请填写完整信息');
                canSubmit = false;
                return false;
            }
        })
        if(canSubmit) {
            let data = JSON.stringify(this.form);
            this.$http.post('/api/monitor', data).then(function (res) {
                this.$router.push('/list')
            }, function (err) {
                console.log(err);
            });
        }
    }
  }
}
</script>

<style lang="less" scoped>
	.add {
		box-sizing: border-box;
		padding: 20px;
        >ul {
            margin-top: 30px;
            >li {
                text-align: center;
                line-height: 40px;
                span {
                    display: inline-block;
                    width: 80px;
                    font-size: 16px;
                    text-align: right;
                }
                .submit {
                    margin-top: 30px;
                }
            }
        }
        
	}
</style>
