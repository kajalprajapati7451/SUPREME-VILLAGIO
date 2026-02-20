// NAV SCROLL
window.addEventListener('scroll',()=>{
  document.getElementById('navbar').classList.toggle('scrolled',window.scrollY>80);
  document.getElementById('scrollTop').classList.toggle('visible',window.scrollY>400);
});

// MOBILE MENU
function openMenu(){document.getElementById('mobileMenu').classList.add('open');}
function closeMenu(){document.getElementById('mobileMenu').classList.remove('open');}

// SCROLL REVEAL
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible');});
},{threshold:0.1});
document.querySelectorAll('.reveal,.reveal-left,.reveal-right').forEach(el=>ro.observe(el));

// TABS
function switchTab(tab,btn){
  document.querySelectorAll('.tab-content').forEach(t=>t.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
  document.getElementById('tab-'+tab).classList.add('active');
  btn.classList.add('active');
}

// GALLERY FILTER
function filterGallery(cat,btn){
  document.querySelectorAll('.gf-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.gallery-item').forEach(item=>{
    item.style.display=(cat==='all'||item.dataset.cat===cat)?'block':'none';
  });
}

// LIGHTBOX
// Build image list dynamically from gallery images so the images/ folder is used
let lbImgs = Array.from(document.querySelectorAll('.gallery-item img')).map(img => img.getAttribute('src'));
// fallback if gallery images are not present
if (!lbImgs || lbImgs.length === 0) {
  lbImgs = [
    'images/1.jpeg','images/2.jpeg','images/3.jpeg','images/4.jpeg','images/5.jpeg','images/6.jpeg',
    'images/7.jpeg','images/8.jpeg','images/9.jpeg','images/10.jpeg','images/11.jpeg','images/12.jpeg'
  ];
}
let lbIdx = 0;
function openLB(i){ lbIdx = i; document.getElementById('lbImg').src = lbImgs[i]; document.getElementById('lightbox').classList.add('open'); document.body.style.overflow = 'hidden'; }
function closeLB(){document.getElementById('lightbox').classList.remove('open');document.body.style.overflow='';}
function closeLBOnBg(e){if(e.target===document.getElementById('lightbox'))closeLB();}
function lbNav(d){lbIdx=(lbIdx+d+lbImgs.length)%lbImgs.length;document.getElementById('lbImg').src=lbImgs[lbIdx];}
document.addEventListener('keydown',e=>{
  if(document.getElementById('lightbox').classList.contains('open')){
    if(e.key==='Escape')closeLB();
    if(e.key==='ArrowRight')lbNav(1);
    if(e.key==='ArrowLeft')lbNav(-1);
  }
});

// VT POPUP
function openVTPopup(){document.getElementById('vtPopup').classList.add('open');document.body.style.overflow='hidden';}
function closeVTPopup(){document.getElementById('vtPopup').classList.remove('open');document.body.style.overflow='';}
document.getElementById('vtPopup').addEventListener('click',function(e){if(e.target===this)closeVTPopup();});

// CAPTCHA
let captchaAns=0;
function genCaptcha(){const a=Math.floor(Math.random()*9)+1,b=Math.floor(Math.random()*9)+1;captchaAns=a+b;document.getElementById('captchaQ').textContent=`${a} + ${b}`;}
genCaptcha();

// FORM
function submitForm(e){
  e.preventDefault();
  const ua=parseInt(document.getElementById('captchaA').value);
  const msg=document.getElementById('formMsg');
  if(ua!==captchaAns){
    msg.className='form-msg error';msg.textContent='❌ Captcha incorrect. Please try again.';
    genCaptcha();document.getElementById('captchaA').value='';return;
  }
  msg.className='form-msg success';
  msg.textContent='✅ Thank you! Our team will connect with you shortly within 1 hour.';
  document.getElementById('contactForm').reset();genCaptcha();
  setTimeout(()=>{msg.className='form-msg';msg.textContent='';},7000);
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click',function(e){
    const t=document.querySelector(this.getAttribute('href'));
    if(t){e.preventDefault();closeMenu();setTimeout(()=>t.scrollIntoView({behavior:'smooth',block:'start'}),100);}
  });
});