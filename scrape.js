const axios = require('axios');
const fs = require('fs');

const proxies = [];
const output_file = 'proxy.txt';

if (fs.existsSync(output_file)) {
  fs.unlinkSync(output_file);
  console.log(`'${output_file}' telah dihapus.`);
}

const raw_proxy_sites = [
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/http.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/https.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks4.txt',
'https://raw.githubusercontent.com/ObcbO/getproxy/master/file/socks5.txt',
'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Https.txt',
'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Socks4.txt',
'https://raw.githubusercontent.com/r00tee/Proxy-List/main/Socks5.txt',
'https://raw.githubusercontent.com/aslisk/proxyhttps/main/https.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/all.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/https/https.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/http/http.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks4/socks4.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/socks5/socks5.txt',
'https://raw.githubusercontent.com/officialputuid/KangProxy/KangProxy/xResults/Proxies.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/http.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/BreakingTechFr/Proxy_Free/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/mix_checked.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/http/global/http_checked.txt',
'https://raw.githubusercontent.com/elliottophellia/yakumo/master/results/socks4/global/socks4_checked.txt',
'https://github.com/elliottophellia/yakumo/blob/master/results/socks5/global/socks5_checked.txt',
'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/https.txt',
'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/SevenworksDev/proxy-list/main/proxies/unknown.txt',
'https://raw.githubusercontent.com/berkay-digital/Proxy-Scraper/main/proxies.txt',
'http://hack-hack.chat.ru/proxy/p4.txt',
'https://github.com/themiralay/Proxy-List-World/raw/master/data.txt',
'https://raw.githubusercontent.com/Tsprnay/Proxy-lists/master/proxies/all.txt',
'https://raw.githubusercontent.com/im-razvan/proxy_list/main/http.txt',
'https://raw.githubusercontent.com/im-razvan/proxy_list/main/socks5.txt',
'https://github.com/andigwandi/free-proxy/raw/main/proxy_list.txt',
'https://raw.githubusercontent.com/sunny9577/proxy-scraper/master/proxies.txt',
'https://github.com/MrMarble/proxy-list/raw/main/all.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/http.txt',
'https://raw.githubusercontent.com/roosterkid/openproxylist/main/HTTPS_RAW.txt',
'https://raw.githubusercontent.com/opsxcq/proxy-list/master/list.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/monosans/proxy-list/main/proxies_anonymous/socks4.txt',
'https://raw.githubusercontent.com/jetkai/proxy-list/main/online-proxies/txt/proxies-socks4.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/http.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/https.txt',
'https://raw.githubusercontent.com/Zaeem20/FREE_PROXIES_LIST/master/socks4.txt',
'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/http.txt',
'https://raw.githubusercontent.com/ALIILAPRO/Proxy/main/socks4.txt',
'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/HTTP.txt',
'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/SOCKS4.txt',
'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/SOCKS5.txt',
'https://raw.githubusercontent.com/B4RC0DE-TM/proxy-list/main/proxies.txt',
'https://raw.githubusercontent.com/hookzof/socks5_list/master/proxy.txt',
'https://raw.githubusercontent.com/clarketm/proxy-list/master/proxy-list-raw.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks5.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/socks4.txt',
'https://raw.githubusercontent.com/TheSpeedX/PROXY-List/master/http.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/http.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/https.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks4.txt',
'https://raw.githubusercontent.com/ErcinDedeoglu/proxies/main/proxies/socks5.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/http.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks5.txt',
'https://raw.githubusercontent.com/MuRongPIG/Proxy-Master/main/socks4.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks4.txt',
'https://raw.githubusercontent.com/prxchk/proxy-list/main/socks5.txt',
'https://raw.githubusercontent.com/TheSpeedX/SOCKS-List/master/http.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/https.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/http.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks5.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/socks4.txt',
'https://raw.githubusercontent.com/vakhov/fresh-proxy-list/master/proxylist.txt',
'https://raw.githubusercontent.com/tuanminpay/live-proxy/master/http.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/all.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/socks4.txt',
'https://raw.githubusercontent.com/TuanMinPay/live-proxy/master/socks5.txt',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/http',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks4',
'https://raw.githubusercontent.com/casals-ar/proxy-list/main/socks5',
'https://raw.githubusercontent.com/proxy4parsing/proxy-list/main/http.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/http_proxies.txt',
'https://raw.githubusercontent.com/Anonym0usWork1221/Free-Proxies/main/proxy_files/https_proxies.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/proxy.txt',
'http://olaf4snow.com/public/proxy.txt',
'http://inav.chat.ru/ftp/proxy.txt',
'https://raw.githubusercontent.com/yuceltoluyag/GoodProxy/main/raw.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/http.txt',
'https://raw.githubusercontent.com/ShiftyTR/Proxy-List/master/https.txt',
'https://proxyspace.pro/http.txt',
'https://api.proxyscrape.com/?request=displayproxies&proxytype=http',
'https://proxyspace.pro/http.txt',
'https://proxyspace.pro/https.txt',
'https://proxyspace.pro/socks4.txt',
'https://proxyspace.pro/socks5.txt',
'https://api.openproxylist.xyz/http.txt',
'http://rootjazz.com/proxies/proxies.txt',
'https://multiproxy.org/txt_all/proxy.txt',
'https://proxy-spider.com/api/proxies.example.txt',
'https://slims-sf.com/Htewarukofdcn/https.txt',
'https://slims-sf.com/Htewarukofdcn/http.txt'
  // ... tambahkan URL lainnya sesuai kebutuhan Anda
];

async function fetchProxies() {
  for (const site of raw_proxy_sites) {
    try {
      const response = await axios.get(site);
      const lines = response.data.split('\n');
      for (const line of lines) {
        if (line.includes(':')) {
          const [ip, port] = line.split(':', 2);
          proxies.push(`${ip}:${port}`);
        }
      }
    } catch (error) {
      console.error(`Gagal mengambil proxy dari ${site}: ${error.message}`);
    }
  }

  fs.writeFileSync(output_file, proxies.join('\n'));
  console.log(`Proxies berhasil diambil dan disimpan dalam ${output_file}`);
}

fetchProxies();
