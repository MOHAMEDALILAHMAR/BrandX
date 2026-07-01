import { useEffect, useRef } from 'react';

/* ─── 5 interactive shader wallpapers ─────────────────────────────────────
   Click anywhere → next mode   |   Click a dot → jump to that mode
   Mode 0: Aurora Nebula         Mode 1: Neural Network
   Mode 2: Hex Grid Warp         Mode 3: Starfield
   Mode 4: Wave Interference
──────────────────────────────────────────────────────────────────────────── */

export function HeroCanvas({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let W = 0, H = 0;

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };
    resize();

    const mouse = { x: W / 2, y: H / 2, down: false };
    let mode = 0, t = 0, raf = 0;

    /* ── shared data ── */
    type P = { x:number; y:number; vx:number; vy:number; r:number; hue:number; a:number };
    const pts: P[] = Array.from({ length: 90 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.7, vy: (Math.random()-.5)*.7,
      r: Math.random()*2.5+.5, hue: 260+Math.random()*40,
      a: Math.random()*.6+.2,
    }));

    type N = { x:number; y:number; vx:number; vy:number; act:number };
    const nodes: N[] = Array.from({ length: 50 }, () => ({
      x: Math.random()*W, y: Math.random()*H,
      vx: (Math.random()-.5)*.4, vy: (Math.random()-.5)*.4, act: 0,
    }));

    type S = { x:number; y:number; z:number; pz:number };
    const stars: S[] = Array.from({ length: 250 }, () => {
      const s: S = { x:(Math.random()-.5)*W*3, y:(Math.random()-.5)*H*3, z:Math.random()*W, pz:0 };
      s.pz = s.z; return s;
    });

    type Src = { x:number; y:number };
    const waveSrc: Src[] = [{ x: W*.28, y: H*.5 }, { x: W*.72, y: H*.35 }];

    const ripples: { x:number; y:number; r:number; a:number }[] = [];

    /* ══════════════ MODE 0 — Aurora Nebula ══════════════ */
    function nebula() {
      ctx.fillStyle = 'rgba(13,6,24,.9)'; ctx.fillRect(0,0,W,H);
      for (let i=0; i<3; i++) {
        const bx = W*(.2+i*.3)+Math.sin(t+i*2.1)*110+(mouse.x-W/2)*.07;
        const by = H*.5+Math.cos(t*.8+i*1.4)*85+(mouse.y-H/2)*.07;
        const g = ctx.createRadialGradient(bx,by,0,bx,by,320);
        g.addColorStop(0, i===1?'rgba(168,85,247,.24)':'rgba(90,47,136,.2)');
        g.addColorStop(1,'rgba(0,0,0,0)');
        ctx.fillStyle=g; ctx.beginPath(); ctx.arc(bx,by,400,0,Math.PI*2); ctx.fill();
      }
      for (let gx=44; gx<W; gx+=56) for (let gy=44; gy<H; gy+=56) {
        const dx=gx-mouse.x,dy=gy-mouse.y,d=Math.hypot(dx,dy);
        const inf=Math.max(0,1-d/230);
        ctx.beginPath(); ctx.arc(gx,gy,1.5+inf*5,0,Math.PI*2);
        ctx.fillStyle=`rgba(168,85,247,${.1+inf*.6})`; ctx.fill();
      }
      for (let i=0; i<pts.length; i++) {
        const p=pts[i]; p.x+=p.vx; p.y+=p.vy;
        const dx=mouse.x-p.x,dy=mouse.y-p.y,d=Math.hypot(dx,dy);
        if (d<200){ p.vx+=dx*.0004; p.vy+=dy*.0004; }
        const sp=Math.hypot(p.vx,p.vy); if(sp>1.8){p.vx*=.92;p.vy*=.92;}
        if(p.x<0)p.x=W; if(p.x>W)p.x=0; if(p.y<0)p.y=H; if(p.y>H)p.y=0;
        for (let j=i+1;j<pts.length;j++) {
          const q=pts[j],dx=p.x-q.x,dy=p.y-q.y,d=Math.hypot(dx,dy);
          if(d<100){
            ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);
            ctx.strokeStyle=`rgba(124,58,237,${(1-d/100)*.2})`;ctx.lineWidth=.8;ctx.stroke();
          }
        }
        ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fillStyle=`hsla(${p.hue},70%,65%,${p.a})`; ctx.fill();
      }
    }

    /* ══════════════ MODE 1 — Neural Network ══════════════ */
    function neural() {
      ctx.fillStyle='rgba(13,6,24,.92)'; ctx.fillRect(0,0,W,H);
      for (let i=0;i<nodes.length;i++) for (let j=i+1;j<nodes.length;j++) {
        const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);
        if(d<170){
          const act=Math.max(a.act,b.act);
          ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
          ctx.strokeStyle=`rgba(124,58,237,${(.07+act*.4)*(1-d/170)})`;
          ctx.lineWidth=.8+act*1.5;ctx.stroke();
        }
      }
      nodes.forEach(n=>{
        n.x+=n.vx;n.y+=n.vy;
        if(n.x<0||n.x>W)n.vx*=-1; if(n.y<0||n.y>H)n.vy*=-1;
        const d=Math.hypot(mouse.x-n.x,mouse.y-n.y);
        n.act=Math.min(1,n.act*.93+Math.max(0,1-d/200)*.4);
        if(n.act>.35){
          const g=ctx.createRadialGradient(n.x,n.y,0,n.x,n.y,24+n.act*22);
          g.addColorStop(0,`rgba(168,85,247,${n.act*.55})`);g.addColorStop(1,'rgba(0,0,0,0)');
          ctx.fillStyle=g;ctx.beginPath();ctx.arc(n.x,n.y,46,0,Math.PI*2);ctx.fill();
        }
        ctx.beginPath();ctx.arc(n.x,n.y,3+n.act*7,0,Math.PI*2);
        ctx.fillStyle=`rgba(168,85,247,${.4+n.act*.6})`; ctx.fill();
      });
    }

    /* ══════════════ MODE 2 — Hex Grid Warp ══════════════ */
    function hexGrid() {
      ctx.fillStyle='rgba(13,6,24,.96)'; ctx.fillRect(0,0,W,H);
      const sz=34, hh=sz*Math.sqrt(3);
      for (let row=-1;row<H/hh+2;row++) for (let col=-1;col<W/(sz*1.5)+2;col++) {
        const cx=col*sz*1.5, cy=row*hh+(col%2===0?0:hh/2);
        const d=Math.hypot(cx-mouse.x,cy-mouse.y);
        const inf=Math.max(0,1-d/260);
        ctx.save();ctx.translate(cx,cy);ctx.scale(1+inf*.65,1+inf*.65);
        ctx.beginPath();
        for(let k=0;k<6;k++){const a=(k/6)*Math.PI*2-Math.PI/6;k===0?ctx.moveTo(Math.cos(a)*sz*.47,Math.sin(a)*sz*.47):ctx.lineTo(Math.cos(a)*sz*.47,Math.sin(a)*sz*.47);}
        ctx.closePath();
        ctx.strokeStyle=`rgba(168,85,247,${.1+inf*.65})`;ctx.lineWidth=1+inf*2;ctx.stroke();
        if(inf>.2){ctx.fillStyle=`rgba(90,47,136,${inf*.38})`;ctx.fill();}
        ctx.restore();
      }
      const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,130);
      g.addColorStop(0,'rgba(168,85,247,.22)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }

    /* ══════════════ MODE 3 — Starfield ══════════════ */
    function starfield() {
      ctx.fillStyle=`rgba(13,6,24,${mouse.down?.1:.26})`;ctx.fillRect(0,0,W,H);
      const speed=mouse.down?32:10;
      stars.forEach(s=>{
        s.pz=s.z;s.z-=speed;
        if(s.z<=0){s.x=(Math.random()-.5)*W*3;s.y=(Math.random()-.5)*H*3;s.z=W;s.pz=W;}
        const sx=(s.x/s.z)*W+W/2,sy=(s.y/s.z)*H+H/2;
        const px=(s.x/s.pz)*W+W/2,py=(s.y/s.pz)*H+H/2;
        ctx.beginPath();ctx.moveTo(px,py);ctx.lineTo(sx,sy);
        ctx.strokeStyle=`rgba(168,85,247,${(1-s.z/W)*.95})`;
        ctx.lineWidth=Math.max(.5,(1-s.z/W)*3);ctx.stroke();
      });
    }

    /* ══════════════ MODE 4 — Wave Interference ══════════════ */
    function waves() {
      ctx.fillStyle='rgba(13,6,24,.88)';ctx.fillRect(0,0,W,H);
      const srcs=[...waveSrc.slice(0,3),{x:mouse.x,y:mouse.y}];
      srcs.forEach((src,si)=>{
        for(let r=(t*90)%75;r<Math.hypot(W,H);r+=75){
          const alpha=Math.max(0,.35-r/Math.hypot(W,H)*.32);
          ctx.beginPath();ctx.arc(src.x,src.y,r,0,Math.PI*2);
          ctx.strokeStyle=`rgba(${si===srcs.length-1?'196,132,252':'124,58,237'},${alpha})`;
          ctx.lineWidth=1.5;ctx.stroke();
        }
      });
      const g=ctx.createRadialGradient(mouse.x,mouse.y,0,mouse.x,mouse.y,90);
      g.addColorStop(0,'rgba(168,85,247,.28)');g.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=g;ctx.fillRect(0,0,W,H);
    }

    const MODES = [nebula, neural, hexGrid, starfield, waves];

    /* ── dots UI ── */
    function drawDots() {
      const R=5,G=14,tot=5*(R*2+G)-G, sx=(W-tot)/2, y=H-26;
      for(let i=0;i<5;i++){
        const x=sx+i*(R*2+G)+R;
        ctx.beginPath();ctx.arc(x,y,i===mode?R:R*.55,0,Math.PI*2);
        ctx.fillStyle=i===mode?'#A855F7':'rgba(168,85,247,.3)';ctx.fill();
      }
    }

    /* ── loop ── */
    function loop(){
      t+=.014;
      MODES[mode]();
      for(let i=ripples.length-1;i>=0;i--){
        const rp=ripples[i];rp.r+=10;rp.a-=.018;
        if(rp.a<=0){ripples.splice(i,1);continue;}
        ctx.beginPath();ctx.arc(rp.x,rp.y,rp.r,0,Math.PI*2);
        ctx.strokeStyle=`rgba(168,85,247,${rp.a})`;ctx.lineWidth=2;ctx.stroke();
        ctx.beginPath();ctx.arc(rp.x,rp.y,rp.r*.55,0,Math.PI*2);
        ctx.strokeStyle=`rgba(196,132,252,${rp.a*.45})`;ctx.lineWidth=1;ctx.stroke();
      }
      drawDots();
      raf=requestAnimationFrame(loop);
    }

    /* ── events ── */
    const onMove=(e:MouseEvent)=>{const r=canvas.getBoundingClientRect();mouse.x=(e.clientX-r.left)*(W/canvas.offsetWidth);mouse.y=(e.clientY-r.top)*(H/canvas.offsetHeight);};
    const onDown=()=>{mouse.down=true;};
    const onUp=()=>{mouse.down=false;};
    const onClick=(e:MouseEvent)=>{
      const r=canvas.getBoundingClientRect();
      const cx=(e.clientX-r.left)*(W/canvas.offsetWidth);
      const cy=(e.clientY-r.top)*(H/canvas.offsetHeight);
      const R=5,G=14,tot=5*(R*2+G)-G,sx=(W-tot)/2,dy=cy-(H-26);
      let hit=-1;
      for(let i=0;i<5;i++){if(Math.hypot(cx-(sx+i*(R*2+G)+R),dy)<18){hit=i;break;}}
      mode=hit>=0?hit:(mode+1)%5;
      ripples.push({x:cx,y:cy,r:0,a:.9});
      if(mode===4&&waveSrc.length<5)waveSrc.push({x:cx,y:cy});
    };
    const onResize=()=>{W=canvas.width=canvas.offsetWidth;H=canvas.height=canvas.offsetHeight;};

    canvas.addEventListener('mousemove',onMove);
    canvas.addEventListener('mousedown',onDown);
    canvas.addEventListener('mouseup',onUp);
    canvas.addEventListener('click',onClick);
    window.addEventListener('resize',onResize);
    loop();

    return()=>{
      cancelAnimationFrame(raf);
      canvas.removeEventListener('mousemove',onMove);
      canvas.removeEventListener('mousedown',onDown);
      canvas.removeEventListener('mouseup',onUp);
      canvas.removeEventListener('click',onClick);
      window.removeEventListener('resize',onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className={className}
      style={{ position:'absolute',inset:0,width:'100%',height:'100%',zIndex:0,cursor:'crosshair' }}
    />
  );
}
