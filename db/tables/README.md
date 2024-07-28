要设计一个数据引擎，其中包括表单管理和用户记录功能，可以按照以下结构来设计 PostgreSQL 数据库：

1. **Forms 表**：存储表单的基本信息。
2. **Fields 表**：存储表单中的各个字段。
3. **FormFields 表**：连接 Forms 表和 Fields 表，定义哪个字段属于哪个表单。
4. **UserForms 表**：存储用户填写的表单记录。
5. **UserFormFields 表**：存储用户填写的表单字段内容。

### 数据库表设计

#### Forms 表
```sql
CREATE TABLE Forms (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT
);
```

#### Fields 表
```sql
CREATE TABLE Fields (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    type VARCHAR(50) NOT NULL,  -- 如 text, number, date 等
    options TEXT               -- 可选字段值，适用于下拉框等
);
```

#### FormFields 表
```sql
CREATE TABLE FormFields (
    id SERIAL PRIMARY KEY,
    form_id INT NOT NULL,
    field_id INT NOT NULL,
    position INT,              -- 字段在表单中的顺序
    is_required BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (form_id) REFERENCES Forms(id),
    FOREIGN KEY (field_id) REFERENCES Fields(id)
);
```

#### UserForms 表
```sql
CREATE TABLE UserForms (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    form_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (form_id) REFERENCES Forms(id)
);
```

#### UserFormFields 表
```sql
CREATE TABLE UserFormFields (
    id SERIAL PRIMARY KEY,
    user_form_id INT NOT NULL,
    field_id INT NOT NULL,
    value TEXT,
    FOREIGN KEY (user_form_id) REFERENCES UserForms(id),
    FOREIGN KEY (field_id) REFERENCES Fields(id)
);
```

### 示例数据和操作

#### 创建一个新表单
```sql
INSERT INTO Forms (name, description) VALUES ('Survey Form', 'A form for survey');

-- 获取新创建的表单 ID
SELECT currval(pg_get_serial_sequence('Forms', 'id'));
```

#### 添加字段到表单
```sql
-- 假设 form_id 为 1
INSERT INTO Fields (name, type) VALUES ('Name', 'text');
INSERT INTO Fields (name, type) VALUES ('Age', 'number');
INSERT INTO Fields (name, type, options) VALUES ('Gender', 'select', 'Male,Female,Other');

-- 获取字段 ID
SELECT currval(pg_get_serial_sequence('Fields', 'id'));

-- 将字段添加到表单
INSERT INTO FormFields (form_id, field_id, position, is_required) VALUES (1, 1, 1, TRUE);
INSERT INTO FormFields (form_id, field_id, position, is_required) VALUES (1, 2, 2, TRUE);
INSERT INTO FormFields (form_id, field_id, position, is_required) VALUES (1, 3, 3, FALSE);
```

#### 用户填写表单
```sql
-- 假设 user_id 为 1，form_id 为 1
INSERT INTO UserForms (user_id, form_id) VALUES (1, 1);

-- 获取新创建的用户表单 ID
SELECT currval(pg_get_serial_sequence('UserForms', 'id'));

-- 填写表单字段
INSERT INTO UserFormFields (user_form_id, field_id, value) VALUES (1, 1, 'John Doe');
INSERT INTO UserFormFields (user_form_id, field_id, value) VALUES (1, 2, '30');
INSERT INTO UserFormFields (user_form_id, field_id, value) VALUES (1, 3, 'Male');
```

顶层是一个form 的表单表, 在页面中展示及为表单包含各种类型的可选字段, form 则需要一张用户记录form 表具体表单如何展示, 有哪些内容的表;

FOREIGN KEY 的选择取决于 性能与数据完整信的取舍.