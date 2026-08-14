/* The Autocuts motion model, transcribed from the app source. Constants and formulas come
   from src/features/studio-motion/model/{timing,frame-effects,zoom-frame,zoom-scales}.ts and
   src/features/compositor/model/{cursor-layer,ripple-layer}.ts. Do not restyle by eye. */
(function () {
  const ZOOM_DURATION_SEC = 0.8;            /* STUDIO_TIMING.zoomDurationSec */
  const ZOOM_HOLD_SEC = 1.3;                /* zoomOutFreezeDurationSec (zoomHoldMs default) */
  const REFERENCE_WIDTH = 960;              /* compositor reference space */
  const CURSOR_SIZE = 28;                   /* defaultStudioSettings.cursorSize */
  const CURSOR_ASPECT = 18.2 / 11.6;        /* cursor.svg viewBox */
  const POINTER_ASPECT = 16.02 / 15.06;     /* handpointing.svg viewBox */
  const LEGACY_CURSOR_UNIT = 28 / 3;
  const CLICK_TOTAL_SEC = 0.5;              /* CLICK_SCALE_TOTAL_SEC */
  const CLICK_BEFORE = 0.38;
  const CLICK_AFTER = 0.62;
  const TRAIL_GHOSTS = 4;
  const TRAIL_LAG = 0.055;
  const TRAIL_OPACITY = 0.3;
  const RINGS = [
    { delaySec: 0 / 60, durationSec: 0.55, maxRadius: 24, strokeWidth: 2.7, alpha: 1 },
    { delaySec: 6 / 60, durationSec: 0.43, maxRadius: 17.3, strokeWidth: 2, alpha: 0.88 },
    { delaySec: 12 / 60, durationSec: 0.32, maxRadius: 11, strokeWidth: 1.5, alpha: 0.68 }
  ];
  const CENTER_DOT = { radius: 8, durationSec: 0.2 };

  const zoomEase = CustomEase.create("acZoom", "0.45, 0, 0.05, 1");
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  const CURSOR_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="8.2 4.9 11.6 18.2">' +
    '<polygon fill="#FFFFFF" points="8.2,20.9 8.2,4.9 19.8,16.5 13,16.5 12.6,16.6 "/>' +
    '<polygon fill="#FFFFFF" points="17.3,21.6 13.7,23.1 9,12 12.7,10.5 "/>' +
    '<rect fill="#000" x="12.5" y="13.6" transform="matrix(0.9221 -0.3871 0.3871 0.9221 -5.7605 6.5909)" width="2" height="8"/>' +
    '<polygon fill="#000" points="9.2,7.3 9.2,18.5 12.2,15.6 12.6,15.5 17.4,15.5 "/></svg>';

  /* src/assets/cursor-icons/handpointing.svg verbatim; the recorder maps the CSS
     cursors pointer/hand to this texture (interaction-track cursor-types.ts). */
  const POINTER_SVG =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="9.06 8.1 15.06 16.02"><g fill="none" fill-rule="evenodd" transform="translate(9 8)"><path d="m3.8852309 13.5522788c.15029277.1354048.25406355.2326609.57471053.5372549.31406586.2983172.46594413.439273.60482646.5572091.05791893.0487853.10729946.1792495.12686364.3731628.01609788.1595565.01049553.3375341-.0090192.5090254-.00674888.0593077-.01325791.1020883-.01698742.1224696-.04186639.2287942.13249226.4401222.36507344.4424801.20929712.0021219.37056581.00472.79741331.0123273.10679864.0019014.10679864.0019014.21395196.0037648 1.16029156.0199598 1.75290683.01448 2.1782236-.039003.45462139-.05716.92282087-.6061887 1.32754658-1.2951218.3429437.6096032.818651 1.2048784 1.2990136 1.282277.1525992.0243739.3372104.0319365.5511764.0270146.1595258-.0036697.328349-.0141847.4987188-.0294071.1284742-.0114791.2308379-.0230173.2919821-.0309462.2259121-.0292954.3737346-.2515956.31337-.4712558-.0130388-.0474468-.0339905-.1345046-.0551176-.2441066-.0244927-.1270617-.0421932-.2511642-.0502379-.3642189-.0051002-.0716765-.0061057-.1365707-.0028638-.1926702.0056365-.097781.007395-.1525378.0101327-.2790463.0010457-.0470941.0010457-.0470941.0024433-.0883088.0052898-.134881.0234093-.2629524.0820463-.5422232.0251901-.1212103.1472903-.3531692.3395862-.6402332.0572734-.0854992.1198813-.1747825.1869659-.2669588.127207-.1747861.2641214-.3514011.4010853-.5204043.0820457-.1012383.1454717-.1769623.1807968-.2180763.2962199-.424403.6120842-1.1191696.7281396-1.5253635.111416-.3904017.2005405-1.10937558.2553074-1.81604479.0300143-.40088807.0411211-.72405394.0411211-1.23097561.0000507-.08891816.0000507-.08891816.0002032-.16234685.0002858-.12025251.0003032-.16573976-.0000887-.22195195-.0010706-.15358041-.0055478-.30580145-.0203882-.6940256-.0319191-.81365149-.4778003-1.3396911-1.1348711-1.44115781-.5589865-.08632026-1.2393839.37795756-1.2393839.37795756s-.1514404-.5228127-.2537197-.6842075c-.1661957-.25934741-.5941748-.58982828-.9213451-.65421118-.3365014-.0653413-.7354024-.05811592-1.1017193.00667481-.3207944.05740454-.64034865.34382687-.82518751.65277182-.13223727.22039488-.00786932-.01169164-.14013104-.2396787-.1830552-.31402315-.60932935-.59522407-1.01524567-.67822294-.34396352-.07112559-.73801897-.04403625-1.09795562.06293793-.46304125.13836397-.53675291.49073282-.55516748.38984626-.06158674-.3382385-.06727482-.3160095-.105656-.55729603-.14258072-.89527436-.30213161-1.51473549-.54406219-2.05528331.01391678.0310773-.08860981-.20214701-.12592279-.28256779-.06461002-.13925416-.12910532-.2652956-.19999629-.38652204-.21850342-.37364978-.46891278-.65340904-.7830908-.81233894-.54561037-.27629378-1.3634177-.14183064-1.75105565.31064856-.38495968.44966797-.4491432 1.20149287-.3521966 2.13184003.03702376.36121263.16678627 1.02066144.28444961 1.50812387.04160602.1691894.07805979.32348903.14491578.60851331.01149723.04848415.01149723.04848415.02309483.09698036.05172236.21571896.09707607.39320067.15122332.5879629-.00568154-.02030261.09701461.344086.11888835.42472961.00727686.02691587.00727686.02691587.01448296.05395339.04082856.15377935.08074083.31959314.14309954.5963099.03412572.1521447.06742545.31468601.09999775.48699018.08883553.46993091.089274.37207374.00375852.27186198-.05907319-.06922522-.11463055-.13209255-.16830659-.19003644-.09976937-.10770214-.19148509-.19677225-.2785569-.2678141-.6343975-.51905295-1.02312991-.74839425-1.55681885-.79878106-.87541567-.08410158-1.70619803.53426712-1.83111632 1.36882761-.07682697.51169638-.05207639.74723271.18463583 1.19942735.13026223.24432805.35060714.53942202.76172732 1.04735429.02515953.031068.02515953.031068.05030428.06206416.50464537.62186746.55962098.69095396.67961467.86473786.32435479.4706845 1.1139501 1.8221455 1.25748612 2.0035872z" fill="#000"/><path d="m1.68266944 9.2716401c-.02488625-.03067752-.02488625-.03067752-.04970567-.06132555-.37729166-.46613768-.58418002-.74321015-.68156241-.9258495-.15281729-.29195235-.1611316-.37107459-.10605794-.73788601.06473349-.43247455.53181583-.78013371 1.01829549-.73339767.33660502.03178017.63068475.20527903 1.15339692.63295262.0565942.04617564.12482853.1124417.20288232.19670163.04616569.04983637.09513192.10524534.14800114.16720042.0794093.0930562.34702847.42052231.30761424.37286894.05814283.06991619.09971852.12407704.14721655.19045018.0941062.13434104.14705111.20894642.21874992.30454484-.0336171-.04487143.21473082.29843305.26732159.34863333.27859812.26593456.68203289.04195871.65675979-.31244785-.00421914-.05916537-.01812774-.12308431-.04717934-.23466885-.11487425-.81923739-.15505751-1.08218312-.24678252-1.56739907-.03407352-.18024544-.06905328-.35098727-.10521102-.5121905-.06435409-.28557213-.10635725-.46007245-.14994794-.62425526-.00774801-.02907063-.00774801-.02907063-.01552357-.05783095-.02300644-.08481964-.12725123-.45470311-.12030828-.42989063-.05134381-.18468043-.0945453-.35373996-.14431997-.56133562-.01130896-.04728909-.01130896-.04728909-.02259904-.09489949-.06649254-.28350912-.10387999-.44176072-.14606063-.6132721-.10998732-.45567652-.23425389-1.08719519-.2671036-1.40768017-.07546665-.72422018-.02339381-1.33418457.17582284-1.56688778.15554834-.1815673.59641015-.25405339.84271752-.12932486.16107512.0814814.32204278.26131571.47435101.521769.05764302.09857191.11172763.20426801.16708381.32357735.0335256.07225783.13292567.29837003.12172905.27336705.21032209.46992469.354801 1.03086841.48791736 1.86671535.03939531.24766201.08813662.52823537.15063928.87150416.01857903.10178746.01857903.10178746.03722922.20314381.30139226 1.63533599.27933797 1.51139381.28367122 1.64182468.01580667.47578071.71810567.4869267.74900255.01188722.00979855-.15065269.00630989-.2851661-.01107827-.67146517-.00245496-.05465243-.00245496-.05465243-.00481877-.10910149-.01521525-.35590459-.01433687-.56066672.00670546-.67705709.03834708-.21223125.22887-.4499778.40434754-.50241339.24641865-.07323589.51640341-.09179599.73269877-.04707051.20703808.0423346.44864736.20171736.51796318.32062499.08353628.14399789.15516008.36337367.21006107.63530456.04431149.21947986.07480439.45493493.0962536.70624261.00667352.0781897.01103024.13859819.01772256.23854675.00285005.04183594.00285005.04183594.00568968.07635213.00160285.01731471.00160285.01731471.00551199.04467336.00303535.01917374.00303535.01917374.01734216.06773608.00727602.13782339.00727602.13782339.56081544.18893151.16530264-.19982737.16530264-.19982737.16077268-.23486454.02708074-.1183491.04365279-.250265.06727822-.49813693.01508098-.16112409.02268576-.24033521.03157416-.32249887.036794-.34012028.0835164-.55621578.140511-.65120691.0707148-.11819408.3197845-.28280909.4314962-.30279961.2805348-.04961763.5886064-.0551978.8264635-.00901194.1077347.021202.3705429.22413969.4327499.32121002.1277282.20156171.2519621.8513817.3219188 1.49611734-.0110122.04228902-.0110122.04228902.1607163.28760404.5903408-.06730286.5903408-.06730286.5737568-.17389206.0155734-.03799147.0279666-.08191522.0455068-.15013809.0421947-.1597068.0701719-.25243998.1118273-.35635899.0288165-.07188915.0591935-.13335501.0903398-.18227881.120675-.18992919.4330876-.31896311.7070596-.2766556.2942545.0454396.4817569.26665023.4998934.72896761.0145423.38042999.0188438.52667972.0198445.67022961.0003693.0529684.0003531.09548963.0000723.21509672-.0001536.07391241-.0001536.07391241-.000205.16397385 0 .48892448-.010469.79353263-.0389535 1.17400348-.0506294.653266-.1361064 1.34281542-.228649 1.66708482-.094456.330596-.3764591.9508823-.5997469 1.2734975-.0158389.0153017-.0838055.0964468-.1706932.2036597-.1445918.1784155-.2892331.364998-.4248114.5512865-.0725632.099704-.140705.1968792-.2036767.2908847-.2436695.3637558-.4000227.6607868-.4506249.9042828-.0664376.3164194-.0901813.4842425-.0973169.666189-.0017426.0515155-.0017426.0515155-.0028439.1014735-.0025547.1180556-.0040857.165727-.0090621.2520573-.0052398.0906702-.0037444.1871795.0035093.2891187.0103883.145992.0000001.3454812.0000001.3454812s-.1266332-.0118299-.2678551-.0085813c-.1725177.0039685-.3159859-.0019087-.4151297-.0177442-.143046-.0230487-.5293508-.5064503-.7271506-.8830611-.3022704-.5764228-1.03604858-.5484427-1.33684295-.0394061-.27130191.4618137-.65965243.9172085-.77493336.9317029-.37460536.047106-.95471158.0524702-2.07175566.0332544-.10679478-.0018572-.10679478-.0018572-.21348729-.0037567-.42889761-.0076439-.41241496.0647655-.40363307-.0124079.02506967-.2203068.02222332-.1790312.00000011-.3992999-.03726222-.36933-.15125405-.6704984-.38877094-.8705429-.12286946-.1043424-.26983033-.2407345-.56500741-.5211097-.33722428-.3203411-.44283686-.4193233-.57299128-.5337266l-.80130455-.8907189c-.08795856-.1124788-.86002339-1.4339349-1.21248613-1.9454077-.13710846-.19857111-.18839645-.26302343-.71461353-.9114734zm9.50873056.0037599v3.459c0 .5.75.5.75 0v-3.459c0-.5-.75-.5-.75 0zm-2.03159602-.00057241.016 3.47300001c.00230346.4999947.7522955.4965395.74999204-.0034552l-.016-3.47299999c-.00230346-.4999947-.7522955-.49653951-.74999204.00345518zm-1.20911102 3.45357381-.021-3.42599996c-.00306475-.4999906-.75305066-.49539349-.74998592.00459712l.021 3.42600004c.00306475.4999906.75305066.4953935.74998592-.0045972z" fill="#fff"/></g></svg>';

  window.ACMotion = function (opts) {
    const frame = opts.frameEl;
    const zoomLayer = opts.zoomEl;
    const W = opts.frameW;
    const H = opts.frameH;
    const unit = opts.canvasW / REFERENCE_WIDTH;
    const cursorPx = CURSOR_SIZE * unit;

    if (zoomLayer) zoomLayer.style.transformOrigin = "50% 50%";

    const cursorEl = document.createElement("div");
    cursorEl.style.cssText =
      "position:absolute;left:0;top:0;z-index:40;pointer-events:none;" +
      `width:${cursorPx}px;height:${cursorPx * CURSOR_ASPECT}px;` +
      "filter:drop-shadow(0 6px 14px rgba(0,0,0,0.12)) drop-shadow(0.5px 3px 6px rgba(0,0,0,0.32));";
    /* Both textures stay mounted; paint() picks one per frame, the way
       cursor-layer.ts swaps sprite textures from the loaded set. */
    cursorEl.innerHTML =
      `<div style="position:absolute;inset:0;">${CURSOR_SVG}</div>` +
      `<div style="position:absolute;inset:0;opacity:0;">${POINTER_SVG}</div>`;
    const arrowWrap = cursorEl.children[0];
    const pointerWrap = cursorEl.children[1];
    arrowWrap.firstChild.style.cssText = "width:100%;height:100%;display:block";
    pointerWrap.firstChild.style.cssText = "width:100%;height:100%;display:block";

    const ghosts = [];
    for (let i = 0; i < TRAIL_GHOSTS; i += 1) {
      const ghost = cursorEl.cloneNode(true);
      ghost.style.zIndex = "39";
      ghost.style.filter = "blur(2px)";
      ghost.style.opacity = "0";
      frame.appendChild(ghost);
      ghosts.push({ el: ghost, aw: ghost.children[0], pw: ghost.children[1], x: opts.restX, y: opts.restY, on: 0 });
    }
    frame.appendChild(cursorEl);

    const rippleHost = document.createElement("div");
    rippleHost.style.cssText = "position:absolute;inset:0;z-index:38;pointer-events:none;overflow:hidden;";
    frame.appendChild(rippleHost);

    const state = {
      z: 1, tx: 0, ty: 0,
      cx: opts.restX, cy: opts.restY,
      dip: 1, sizeMul: 1, ptr: 0,
      ripples: []
    };

    const toCanvas = (x, y) => ({
      x: W / 2 + (x - W / 2) * state.z + state.tx,
      y: H / 2 + (y - H / 2) * state.z + state.ty
    });

    function paint() {
      if (zoomLayer) zoomLayer.style.transform = `translate(${state.tx}px, ${state.ty}px) scale(${state.z})`;

      const c = toCanvas(state.cx, state.cy);
      const ptr = state.ptr >= 0.5;
      const aspect = ptr ? POINTER_ASPECT : CURSOR_ASPECT;
      arrowWrap.style.opacity = ptr ? "0" : "1";
      pointerWrap.style.opacity = ptr ? "1" : "0";
      const base = cursorPx * state.sizeMul;
      const size = base * state.dip;
      const offset = base * (1 - state.dip) * 0.5;
      cursorEl.style.width = size + "px";
      cursorEl.style.height = size * aspect + "px";
      cursorEl.style.transform = `translate(${c.x - offset}px, ${c.y - offset * 1.15}px)`;

      for (const ghost of ghosts) {
        const g = toCanvas(ghost.x, ghost.y);
        ghost.aw.style.opacity = arrowWrap.style.opacity;
        ghost.pw.style.opacity = pointerWrap.style.opacity;
        ghost.el.style.width = size + "px";
        ghost.el.style.height = size * aspect + "px";
        ghost.el.style.opacity = String(ghost.on);
        ghost.el.style.transform = `translate(${g.x}px, ${g.y}px)`;
      }

      rippleHost.innerHTML = "";
      for (const ripple of state.ripples) {
        if (ripple.p <= 0 || ripple.p >= 1) continue;
        const elapsed = ripple.p * ripple.maxSec;
        const at = toCanvas(ripple.x, ripple.y);
        for (const ring of RINGS) {
          const local = (elapsed - ring.delaySec) / ring.durationSec;
          if (local < 0 || local > 1) continue;
          const radius = ring.maxRadius * (1 - Math.pow(1 - local, 3)) * unit;
          const opacity = ring.alpha * Math.pow(1 - local, 1.8);
          const stroke = Math.max(0.4, ring.strokeWidth * (1 - local * 0.78)) * unit;
          const el = document.createElement("div");
          el.style.cssText =
            `position:absolute;border-radius:50%;left:${at.x - radius}px;top:${at.y - radius}px;` +
            `width:${radius * 2}px;height:${radius * 2}px;` +
            `border:${stroke}px solid rgba(255,255,255,${opacity});` +
            `box-shadow:0 0 0 ${unit * 0.6}px rgba(0,0,0,${opacity * 0.3});`;
          rippleHost.appendChild(el);
        }
        if (elapsed < CENTER_DOT.durationSec) {
          const local = elapsed / CENTER_DOT.durationSec;
          const radius = CENTER_DOT.radius * (1 - Math.pow(1 - local, 2)) * unit;
          const opacity = Math.pow(1 - local, 1.2) * 0.8;
          const el = document.createElement("div");
          el.style.cssText =
            `position:absolute;border-radius:50%;left:${at.x - radius}px;top:${at.y - radius}px;` +
            `width:${radius * 2}px;height:${radius * 2}px;background:rgba(255,255,255,${opacity});`;
          rippleHost.appendChild(el);
        }
      }
    }

    const api = { state, paint, cursorEl };

    /* Cursor travel with the trail ghosts the compositor draws for fast moves. */
    api.travel = (tl, at, dur, toX, toY) => {
      tl.to(state, { cx: toX, cy: toY, duration: dur, ease: "power2.inOut", onUpdate: paint }, at);
      ghosts.forEach((ghost, index) => {
        const lag = TRAIL_LAG * (index + 1);
        tl.to(ghost, { x: toX, y: toY, duration: dur, ease: "power2.inOut", onUpdate: paint }, at + lag);
        tl.to(ghost, { on: TRAIL_OPACITY * 0.55 * (1 - index / TRAIL_GHOSTS), duration: 0.1, onUpdate: paint }, at + lag);
        tl.to(ghost, { on: 0, duration: 0.12, onUpdate: paint }, at + dur);
      });
    };

    /* cursorClickScale: 0.5s total, 38% press / 62% release, both easeInOutCubic. */
    api.click = (tl, atSec, x, y) => {
      const legacySize = Math.max(0.1, CURSOR_SIZE / LEGACY_CURSOR_UNIT);
      const pressed = 1 - Math.min(0.504 / legacySize, 0.22);
      const down = CLICK_TOTAL_SEC * CLICK_BEFORE;
      const up = CLICK_TOTAL_SEC * CLICK_AFTER;
      tl.to(state, {
        dip: pressed, duration: down,
        ease: (t) => easeInOutCubic(t), onUpdate: paint
      }, atSec - down);
      tl.to(state, {
        dip: 1, duration: up,
        ease: (t) => easeInOutCubic(t), onUpdate: paint
      }, atSec);

      const ripple = { p: 0, x, y, maxSec: Math.max(...RINGS.map((r) => r.delaySec + r.durationSec)) };
      state.ripples.push(ripple);
      tl.fromTo(ripple, { p: 0 }, { p: 1, duration: ripple.maxSec, ease: "none", onUpdate: paint }, atSec);
    };

    /* The real zoom: scale about the canvas centre; pan the clicked point toward centre,
       clamped so the video edge never enters the frame; translation ramps with the same
       eased progress (coefficient = progress x level). In over 0.8s ENDING at the click,
       hold, out over 0.8s. */
    api.zoom = (tl, clickAtSec, level, x, y, holdSec) => {
      const hold = holdSec ?? ZOOM_HOLD_SEC;
      const maxX = W / 2 - W / (level * 2);
      const maxY = H / 2 - H / (level * 2);
      const ax = clamp(W / 2 - x, -maxX, maxX);
      const ay = clamp(H / 2 - y, -maxY, maxY);
      const proxy = { p: 0 };
      const apply = () => {
        state.z = 1 + (level - 1) * proxy.p;
        state.tx = ax * level * proxy.p;
        state.ty = ay * level * proxy.p;
        paint();
      };
      tl.to(proxy, { p: 1, duration: ZOOM_DURATION_SEC, ease: zoomEase, onUpdate: apply }, clickAtSec - ZOOM_DURATION_SEC);
      tl.to(proxy, { p: 0, duration: ZOOM_DURATION_SEC, ease: zoomEase, onUpdate: apply }, clickAtSec + hold);
    };

    /* Follow-camera drift toward a new cursor position mid-hold: critically damped in the
       app (halfLife 0.2s, hold 0.18s, ramp 0.32s); a 0.6s power2.out lands the same shape. */
    api.follow = (tl, atSec, level, x, y) => {
      const maxX = W / 2 - W / (level * 2);
      const maxY = H / 2 - H / (level * 2);
      tl.to(state, {
        tx: clamp(W / 2 - x, -maxX, maxX) * level,
        ty: clamp(H / 2 - y, -maxY, maxY) * level,
        duration: 0.6, ease: "power2.out", onUpdate: paint
      }, atSec + 0.18);
    };

    /* The recorder samples the live CSS cursor each frame; over a control it reads
       "pointer" and the compositor draws handpointing.svg. The swap is a hard cut. */
    api.pointer = (tl, atSec, on) => {
      tl.to(state, { ptr: on ? 1 : 0, duration: 0.02, onUpdate: paint }, atSec);
    };
    api.arrowWrap = arrowWrap;
    api.pointerWrap = pointerWrap;

    paint();
    return api;
  };
})();
