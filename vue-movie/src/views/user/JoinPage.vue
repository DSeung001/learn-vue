<template>
  <div class="container">
    <form>
      <h2>회원가입</h2>

      <div class="form-group">
        <label for="name">이름</label>
        <input
          type="text"
          class="form-control"
          id="name"
          placeholder="이름을 입력하세요"
          required
        />
      </div>
      <div class="form-group">
        <label for="email">이메일 주소</label>
        <input
          type="email"
          class="form-control"
          id="email"
          placeholder="이메일 주소를 입력하세요"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          class="form-control"
          id="password"
          placeholder="비밀번호를 입력하세요"
          required
        />
      </div>
      <div class="form-group">
        <label for="password-confirm">비밀번호 확인</label>
        <input
          type="password"
          class="form-control"
          id="password-confirm"
          name="password-confirm"
          placeholder="비밀번호 확인을 입력하세요"
          required
        />
      </div>
      <button type="submit" class="btn btn-primary">회원가입</button>
    </form>
  </div>
</template>

<script setup></script>

<style scoped>
.container {
  margin-top: 50px;
  max-width: 500px;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
}

h2 {
  font-size: 24px;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.form-control {
  height: 45px;
  font-size: 16px;
  border-radius: 5px;
  border: none;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
  padding: 10px 20px;
  font-size: 16px;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease;
}

.btn-primary:hover {
  background-color: #0069d9;
  border-color: #0062cc;
}
</style>
