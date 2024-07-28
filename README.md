## stock url 
```
curl 'https://stock.xueqiu.com/v5/stock/chart/minute.json?symbol=SH000001&period=1d' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: zh-CN,zh;q=0.9' \
  -H 'cookie: cookiesu=491705470104282; device_id=085916375efa5f2f82fea499d1fa1329; s=bg1alyt078; snbim_minify=true; Hm_lvt_1db88642e346389874251b5a1eded6e3=1720687887; HMACCOUNT=E862572B15AB064B; xq_a_token=6092faf94ea85d2d773a94a45b16fe8a941987bf; xqat=6092faf94ea85d2d773a94a45b16fe8a941987bf; xq_id_token=eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJ1aWQiOjEyNjQyNzU5ODQsImlzcyI6InVjIiwiZXhwIjoxNzIzMjgwMDk2LCJjdG0iOjE3MjA2ODgwOTYyMDEsImNpZCI6ImQ5ZDBuNEFadXAifQ.RtVEb_pGexDcspx1cWXTABQ_lJZmwLnNgt4g1o_515_L_bPnccLNNnfI0Wrl603DEXGYeSxBxpZeCFXvm_xqznDGVfUX-popdXJt4cnzpamEBrg8O-XJhmrngz-6C8MgUCiohY9lv_hcKimpHqw3a_xsrx5rWWavY46bcMwO_7RuYOowvitO6AlfccMG2r6bGK-gb12m3zJr_we1IgAYFrHRueHgRv0BAd1E_mmvADv_jnFAt2kD_lStEOJe1lNvS90oXjSdbQYD36i54ox6jqugWFYf8M3opXKxwulVrIjEp0UwyHgRCtpkZyC1kSQMyx1mG6-qci8PP_tovTXnHw; xq_r_token=ab7bd6b59cb54f3243b7cf0787f085bd65c7a316; xq_is_login=1; u=1264275984; Hm_lpvt_1db88642e346389874251b5a1eded6e3=1720688128; is_overseas=1' \
  -H 'origin: https://xueqiu.com' \
  -H 'priority: u=1, i' \
  -H 'referer: https://xueqiu.com/S/SH000001' \
  -H 'sec-ch-ua: "Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-site' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
```


```dockerfile
# 使用 Node 官方镜像作为基础镜像
FROM ubuntu

# 设置工作目录
WORKDIR /app

# 安装依赖

# 复制项目文件
COPY . .



# 启动开发服务器
CMD ["bash"]
```