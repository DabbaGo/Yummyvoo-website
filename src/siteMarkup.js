// Body markup of the YummyVoo site, kept verbatim so <template>s and
// custom data-* attributes are preserved. Injected via dangerouslySetInnerHTML
// in App.jsx, then hydrated by initYummyVoo().
export const siteMarkup = `
<a class="skip" href="#main">Skip to content</a>

<header class="hdr" id="hdr">
  <div class="wrap hdr-in">
    <a class="brand" href="#home" aria-label="YummyVoo home"><svg class="brand-mk" aria-hidden="true"><use href="#logo"/></svg><span class="brand-nm">Yummy<b>Voo</b></span></a>
    <nav class="nav" id="nav" aria-label="Primary">
      <a href="#home">Home</a><a href="#how">How It Works</a><a href="#features">Features</a><a href="#stories">Kitchen Stories</a><a href="#eco">Eco Packaging</a><a href="#kitchens">For Kitchens</a><a href="#about">About</a>
    </nav>
    <div class="hdr-act">
      <a class="btn btn-primary btn-sm" href="#download">Download App</a>
      <button class="menu-btn" id="menuBtn" aria-expanded="false" aria-controls="nav" aria-label="Open menu"><span></span><span></span></button>
    </div>
  </div>
</header>

<main id="main">

<!-- HERO -->
<section id="home" class="hero">
  <div class="wrap hero-grid">
    <div class="hero-copy">
      <p class="pill"><span class="live"></span>Local cloud kitchens, discovered</p>
      <h1>Your Favorite Food.<span class="g">Their Kitchen Story.</span></h1>
      <p class="lead">Discover local cloud kitchens, explore their stories, and order delicious food through YummyVoo.</p>
      <div class="cta-row">
        <a class="btn btn-primary btn-lg" href="#download"><svg class="ic" aria-hidden="true"><use href="#i-phone"/></svg>Download the YummyVoo App</a>
        <a class="btn btn-ghost btn-lg" href="#what">Explore YummyVoo</a>
      </div>
      <p class="trust"><span><svg class="ic" aria-hidden="true"><use href="#i-compass"/></svg>Discover</span><i>•</i><span><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg>Watch</span><i>•</i><span><svg class="ic" aria-hidden="true"><use href="#i-cart"/></svg>Order</span></p>
    </div>
    <div class="hv rv" role="img" aria-label="YummyVoo app screens showing the home feed, a Kitchen Story and a kitchen page">
      <div class="phone p1" data-screen="home" aria-hidden="true"></div>
      <div class="phone p3" data-screen="kitchen" aria-hidden="true"></div>
      <div class="phone p2" data-screen="story" aria-hidden="true"></div>
      <div class="fx f1 glass float" aria-hidden="true"><span class="live"></span><div><b>Chef's special is live</b><small>Kitchen Story · Green Bowl</small></div></div>
      <div class="fx f2 glass float b" aria-hidden="true"><span class="ck"><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg></span><div><b>Order placed</b><small>Arriving in about 25 min</small></div></div>
      <div class="fx f3 float b" aria-hidden="true"><svg viewBox="0 0 200 200"><use href="#f-bowl"/></svg></div>
      <div class="fx f4 float" aria-hidden="true"><svg viewBox="0 0 200 200"><use href="#f-burger"/></svg></div>
    </div>
  </div>
</section>

<!-- WHAT IS YUMMYVOO -->
<section id="what" class="sec">
  <div class="wrap split">
    <div class="rv">
      <h2>Food Ordering, With a Story Behind It.</h2>
      <p class="lead">YummyVoo is a food-tech platform built around local cloud kitchens and food businesses. Instead of simply showing you a menu, YummyVoo helps you discover the people, kitchens, and stories behind the food.</p>
      <ul class="hl">
        <li><span class="hi"><svg class="ic" aria-hidden="true"><use href="#i-store"/></svg></span><div><h3>Local Kitchens</h3><p>Discover food businesses around you.</p></div></li>
        <li><span class="hi"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg></span><div><h3>Kitchen Stories</h3><p>See behind-the-scenes content from kitchens.</p></div></li>
        <li><span class="hi"><svg class="ic" aria-hidden="true"><use href="#i-cart"/></svg></span><div><h3>Easy Ordering</h3><p>Discover, choose, and order directly through the app.</p></div></li>
      </ul>
    </div>
    <div class="scene ph slate rv" role="img" aria-label="Illustration of a chef in a cloud kitchen with a sizzling pan and fresh ingredients" data-fd="chef w60 l4 b-3;pan w50 r-8 t6 fl;steam w22 r14 t-8;veg w36 r5 b10">
      <div class="glass g1" aria-hidden="true"><span class="av"><svg viewBox="0 0 200 200"><use href="#f-bowl"/></svg></span><div><b>Green Bowl</b><small>Cloud kitchen · Sector 62, Noida</small></div></div>
      <div class="glass g2" aria-hidden="true"><span class="ck"><svg class="ic fl" aria-hidden="true"><use href="#i-play"/></svg></span><div><b>Today's preparation</b><small>Kitchen Story · 2h ago</small></div></div>
    </div>
  </div>
</section>

<!-- KITCHEN STORIES -->
<section id="stories" class="sec stories">
  <div class="wrap">
    <div class="sh c rv">
      <h2>Meet Kitchen Stories</h2>
      <p class="sub">Don't just order the food. See where it comes from.</p>
      <p class="lead">Kitchen Stories gives customers a behind-the-scenes look at local kitchens. Kitchens can share daily preparations, special dishes, offers, and the people behind the food.</p>
    </div>
    <div class="fan rv" role="list" aria-label="Examples of Kitchen Stories">
      <article class="sc ph leaf" role="listitem" aria-label="Kitchen Story: Today's preparation" data-fd="veg w150 l-24 t26;bowl w54 r-14 b10">
        <div class="shade t"></div>
        <div class="bars"><i class="f"></i><i class="p"><b></b></i><i></i><i></i></div>
        <div class="who"><span class="av"><svg viewBox="0 0 200 200"><use href="#f-bowl"/></svg></span>Green Bowl<span class="ago">2h</span></div>
        <div class="cap"><span class="tg">Today's preparation</span><b>Prepping for the lunch rush</b></div>
      </article>
      <article class="sc ph wood" role="listitem" aria-label="Kitchen Story: Chef preparing food" data-fd="pan w150 l-22 t30;steam w52 l30 t8">
        <div class="shade t"></div>
        <div class="bars"><i class="f"></i><i class="f"></i><i class="p"><b></b></i><i></i></div>
        <div class="who"><span class="av"><svg viewBox="0 0 200 200"><use href="#f-thali"/></svg></span>Amma's Kitchen<span class="lv">Live</span></div>
        <div class="cap"><span class="tg">Chef preparing food</span><b>Sizzling since 11 a.m.</b></div>
      </article>
      <article class="sc ph cream" role="listitem" aria-label="Kitchen Story: Fresh ingredients" data-fd="veg w118 l-8 t28">
        <div class="shade t"></div>
        <div class="bars"><i class="f"></i><i class="p"><b></b></i><i></i></div>
        <div class="who"><span class="av"><svg viewBox="0 0 200 200"><use href="#f-tiffin"/></svg></span>Healthy Ghar<span class="ago">5h</span></div>
        <div class="cap"><span class="tg">Fresh ingredients</span><b>Picked up at 6 a.m.</b></div>
      </article>
      <article class="sc ph lime" role="listitem" aria-label="Kitchen Story: Today's special" data-fd="bowl w118 l-9 t24">
        <div class="shade t"></div>
        <div class="bars"><i class="f"></i><i class="f"></i><i class="f"></i><i class="p"><b></b></i></div>
        <div class="who"><span class="av"><svg viewBox="0 0 200 200"><use href="#f-bowl"/></svg></span>Green Bowl<span class="ago">1h</span></div>
        <div class="cap"><span class="tg">Today's special</span><b>Chicken Pesto Bowl is back</b><span class="go">Order in the app</span></div>
      </article>
      <article class="sc ph slate" role="listitem" aria-label="Kitchen Story: Kitchen behind the scenes" data-fd="chef w104 l-2 b-4;steam w40 r0 t22">
        <div class="shade t"></div>
        <div class="bars"><i class="f"></i><i class="p"><b></b></i><i></i></div>
        <div class="who"><span class="av"><svg viewBox="0 0 200 200"><use href="#f-cake"/></svg></span>Morning Bites<span class="ago">3h</span></div>
        <div class="cap"><span class="tg">Behind the scenes</span><b>Meet the team</b></div>
      </article>
    </div>
    <div class="cta-c rv"><a class="btn btn-soft btn-lg" href="#download">Experience Kitchen Stories in the App →</a></div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section id="how" class="sec">
  <div class="wrap">
    <div class="sh c rv"><h2>From Discovery to Doorstep</h2></div>
    <ol class="steps rv">
      <li class="step">
        <div class="node"><svg class="ic" aria-hidden="true"><use href="#i-compass"/></svg><span class="num">01</span></div>
        <h3>Discover</h3><p>Find local cloud kitchens and food businesses.</p>
        <div class="mini m1" aria-hidden="true"><span class="pin" style="left:18%;top:26%"></span><span class="pin b" style="left:52%;top:18%"></span><span class="pin" style="left:76%;top:46%"></span><span class="mchip">3 kitchens near you</span></div>
      </li>
      <li class="step">
        <div class="node"><svg class="ic" aria-hidden="true"><use href="#i-menu"/></svg><span class="num">02</span></div>
        <h3>Explore</h3><p>Browse menus, ratings, offers and kitchen information.</p>
        <div class="mini m2" aria-hidden="true">
          <div class="mr"><span class="ph cream" data-fd="bowl w130 l-15 t-15"></span><div><b>Green Bowl</b><small>Healthy bowls · 1.2 km</small></div><em>4.8★</em></div>
          <div class="mr"><span class="ph cream" data-fd="burger w130 l-15 t-15"></span><div><b>Home Bowl</b><small>Comfort food · 2.5 km</small></div><em>4.6★</em></div>
        </div>
      </li>
      <li class="step">
        <div class="node"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg><span class="num">03</span></div>
        <h3>Watch</h3><p>See Kitchen Stories and discover what's happening behind the scenes.</p>
        <div class="mini m3" aria-hidden="true"><span class="rg"><span class="ph cream" data-img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><span class="play"><svg class="ic fl"><use href="#i-play"/></svg></span><span class="rg"><span class="ph cream" data-img="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><span class="rg off"><span class="ph cream" data-img="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span></div>
      </li>
      <li class="step">
        <div class="node"><svg class="ic" aria-hidden="true"><use href="#i-cart"/></svg><span class="num">04</span></div>
        <h3>Order</h3><p>Choose your food and place your order through the YummyVoo app.</p>
        <div class="mini m4" aria-hidden="true"><span class="ob"><svg class="ic"><use href="#i-cart"/></svg>Place order · ₹249</span><small><svg class="ic"><use href="#i-check"/></svg>Order confirmed</small></div>
      </li>
    </ol>
  </div>
</section>

<!-- FEATURES -->
<section id="features" class="sec alt">
  <div class="wrap">
    <div class="sh c rv"><h2>Everything You Need to Discover Better Food</h2></div>
    <div class="bento rv">
      <article class="fc w4 dark">
        <span class="fi"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg></span>
        <h3>Kitchen Stories</h3><p>Watch behind-the-scenes content from local kitchens.</p>
        <div class="fv rings" aria-hidden="true">
          <span class="rg"><span class="ph cream photo" data-img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><span class="rg"><span class="ph cream photo" data-img="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><span class="rg"><span class="ph cream photo" data-img="https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><span class="rg off"><span class="ph cream photo" data-img="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><span class="rg off"><span class="ph cream photo" data-img="https://images.unsplash.com/photo-1536257104079-aa99c6460a5a?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span>
          <span class="live-b">● Live now</span>
        </div>
      </article>
      <article class="fc">
        <span class="fi"><svg class="ic" aria-hidden="true"><use href="#i-pin"/></svg></span>
        <h3>Discover Local Kitchens</h3><p>Find interesting food businesses around you.</p>
        <div class="fv kl" aria-hidden="true">
          <div class="kr"><span class="ph cream" data-fd="bowl w130 l-15 t-15"></span><div><b>Green Bowl</b><small>1.2 km</small></div><em>4.8★</em></div>
          <div class="kr"><span class="ph cream" data-fd="thali w130 l-15 t-15"></span><div><b>Amma's Kitchen</b><small>1.9 km</small></div><em>4.7★</em></div>
        </div>
      </article>
      <article class="fc">
        <span class="fi"><svg class="ic" aria-hidden="true"><use href="#i-filter"/></svg></span>
        <h3>Smart Filters</h3><p>Filter kitchens based on preferences such as vegetarian/non-vegetarian, distance and ratings.</p>
        <div class="fv" aria-hidden="true"><div class="fchips"><span class="fch on">Veg</span><span class="fch">Non-veg</span><span class="fch on">4.0+ ★</span></div><div class="slide"><i></i></div><div class="slide-l"><span>1 km</span><span>Up to 2 km</span></div></div>
      </article>
      <article class="fc">
        <span class="fi"><svg class="ic" aria-hidden="true"><use href="#i-tag"/></svg></span>
        <h3>Daily Offers</h3><p>Discover special offers and featured dishes.</p>
        <div class="fv" aria-hidden="true"><div class="tk"><big>30%</big><span class="sep"></span><span><b>Bowls &amp; Salads</b><small>Ends in 2h 14m</small></span></div></div>
      </article>
      <article class="fc">
        <span class="fi"><svg class="ic" aria-hidden="true"><use href="#i-store"/></svg></span>
        <h3>Kitchen Profiles</h3><p>Learn about the kitchen before ordering.</p>
        <div class="fv" aria-hidden="true"><div class="kp"><span class="rg"><span class="ph cream photo" data-img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><div><b>Green Bowl</b><small>12.4k followers</small></div><span class="fo">Follow</span></div><div class="tabs-m"><span class="on">Menu</span><span>Stories</span><span>Reviews</span><span>About</span></div></div>
      </article>
      <article class="fc w6 green">
        <div>
          <span class="fi"><svg class="ic" aria-hidden="true"><use href="#i-cart"/></svg></span>
          <h3>Easy Food Ordering</h3><p>Browse menus and order conveniently through the app.</p>
        </div>
        <div aria-hidden="true"><div class="omr"><span class="ph cream" data-fd="bowl w130 l-15 t-15"></span><div><b>Chicken Pesto Bowl</b>₹249</div><span class="q">1 added</span></div><div class="cartm"><div><small>1 ITEM IN CART</small>₹249</div><span>View Cart →</span></div></div>
      </article>
    </div>
  </div>
</section>

<!-- APP PREVIEW -->
<section id="preview" class="sec preview">
  <div class="wrap"><div class="sh c rv"><h2>See YummyVoo in Action</h2></div></div>
  <div class="rail" id="rail" tabindex="0" aria-label="YummyVoo app screens, scroll horizontally">
    <figure class="ri rv" style="--d:0s"><div class="phone" data-screen="explore" role="img" aria-label="Explore screen"></div><figcaption>Explore<small>Find kitchens and trending dishes</small></figcaption></figure>
    <figure class="ri rv" style="--d:.06s"><div class="phone" data-screen="story" role="img" aria-label="Kitchen Story screen"></div><figcaption>Kitchen Story<small>Watch what's cooking right now</small></figcaption></figure>
    <figure class="ri rv" style="--d:.12s"><div class="phone" data-screen="kitchen" role="img" aria-label="Kitchen profile screen"></div><figcaption>Kitchen profile<small>Know the kitchen before you order</small></figcaption></figure>
    <figure class="ri rv" style="--d:.18s"><div class="phone" data-screen="menu" role="img" aria-label="Menu screen"></div><figcaption>Menu<small>Browse, add, and go</small></figcaption></figure>
    <figure class="ri rv" style="--d:.24s"><div class="phone" data-screen="dish" role="img" aria-label="Food details screen"></div><figcaption>Food details<small>What's inside every dish</small></figcaption></figure>
    <figure class="ri rv" style="--d:.3s"><div class="phone" data-screen="order" role="img" aria-label="Order tracking screen"></div><figcaption>Order experience<small>Track it from kitchen to door</small></figcaption></figure>
  </div>
  <div class="wrap">
    <div class="rail-ctl"><button class="rbtn" id="prev" aria-label="Previous screen"><svg class="ic" aria-hidden="true"><use href="#i-chev-l"/></svg></button><button class="rbtn" id="next" aria-label="Next screen"><svg class="ic" aria-hidden="true"><use href="#i-chev"/></svg></button></div>
    <p class="fine">App screens shown are illustrative and may differ slightly from the latest release.</p>
  </div>
</section>

<!-- FOR CUSTOMERS -->
<section id="customers" class="sec alt">
  <div class="wrap split">
    <div class="rv">
      <h2>Discover Something New Every Day</h2>
      <p class="lead">Whether you're looking for your regular meal or a new local favorite, YummyVoo helps you discover kitchens beyond the usual choices.</p>
      <div class="cta-row"><a class="btn btn-primary btn-lg" href="#download">Download YummyVoo</a></div>
    </div>
    <ul class="cats rv">
      <li class="cat"><span aria-hidden="true">🍱</span>Everyday Meals</li>
      <li class="cat"><span aria-hidden="true">🍕</span>Snacks &amp; Fast Food</li>
      <li class="cat"><span aria-hidden="true">🥗</span>Healthy Food</li>
      <li class="cat"><span aria-hidden="true">🍛</span>Home-style Food</li>
      <li class="cat"><span aria-hidden="true">🍰</span>Desserts</li>
      <li class="cat"><span aria-hidden="true">🍽️</span>Local Favorites</li>
    </ul>
  </div>
</section>

<!-- FOR KITCHENS -->
<section id="eco" class="sec">
  <div class="wrap split">
    <div class="scene ph leaf rv" role="img" aria-label="Illustration of biodegradable kraft-paper food packaging with a fresh leaf sprig on top" data-fd="kraft w76 l12 t8">
      <div class="glass g1" aria-hidden="true"><span class="ck"><svg class="ic fl" aria-hidden="true"><use href="#i-leaf"/></svg></span><div><b>Plastic-free order</b><small>Packed today · Green Bowl</small></div></div>
      <div class="glass g2" aria-hidden="true"><span class="ck"><svg class="ic" aria-hidden="true"><use href="#i-globe"/></svg></span><div><b>100% biodegradable</b><small>Breaks down naturally</small></div></div>
    </div>
    <div class="rv">
      <p class="pill">🌱 Sustainable by default</p>
      <h2>No Plastic. Just the Planet-Friendly Kind.</h2>
      <p class="lead">We believe great food shouldn't come wrapped in plastic that outlives the meal. Every YummyVoo order is packed and delivered using fully biodegradable materials — kitchen to doorstep.</p>
      <ul class="hl">
        <li><span class="hi"><svg class="ic" aria-hidden="true"><use href="#i-box"/></svg></span><div><h3>Biodegradable Containers</h3><p>Plant-based packaging that breaks down naturally, never landfill plastic.</p></div></li>
        <li><span class="hi"><svg class="ic" aria-hidden="true"><use href="#i-cutlery"/></svg></span><div><h3>Compostable Cutlery</h3><p>Wooden and plant-fibre cutlery — never single-use plastic.</p></div></li>
        <li><span class="hi"><svg class="ic" aria-hidden="true"><use href="#i-leaf"/></svg></span><div><h3>Zero Single-Use Plastic</h3><p>No plastic bags, seals or wrap — on any order, from any kitchen.</p></div></li>
      </ul>
    </div>
  </div>
</section>

<section id="kitchens" class="sec">
  <div class="wrap">
    <div class="kpanel rv">
      <div>
        <p class="pill-d"><svg class="ic" aria-hidden="true"><use href="#i-store"/></svg>For cloud kitchens</p>
        <h2>Are You a Cloud Kitchen?</h2>
        <p class="ksub">Turn your kitchen into a brand customers can discover.</p>
        <p class="lead">YummyVoo helps local kitchens and food businesses get found, get followed, and get ordered from.</p>
        <ul class="ben">
          <li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>Reach local customers</li>
          <li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>Showcase your food</li>
          <li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>Share Kitchen Stories</li>
          <li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>Promote special dishes</li>
          <li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>Build a recognizable kitchen brand</li>
          <li><svg class="ic" aria-hidden="true"><use href="#i-check"/></svg>Receive orders through the platform</li>
        </ul>
        <div class="cta-row" style="margin-top:0">
          <a class="btn btn-soft btn-lg" href="mailto:admin@yummyvoo.com?subject=Join%20YummyVoo%20as%20a%20Kitchen">Join YummyVoo as a Kitchen</a>
          <a class="btn btn-line btn-lg" href="mailto:admin@yummyvoo.com?subject=Talk%20to%20the%20YummyVoo%20team">Talk to Our Team</a>
        </div>
      </div>
      <div class="kvis ph slate" role="img" aria-label="A kitchen owner's profile as customers see it in the YummyVoo app" data-fd="chef w62 l-6 b-4;steam w20 l24 t6">
        <div class="phone" data-screen="kitchen" aria-hidden="true"></div>
        <div class="glass k1" aria-hidden="true"><span class="ck"><svg class="ic" aria-hidden="true"><use href="#i-cart"/></svg></span><div><b>New order received</b><small>Chicken Pesto Bowl · ₹249</small></div></div>
        <div class="glass k2" aria-hidden="true"><span class="ck"><svg class="ic fl" aria-hidden="true"><use href="#i-play"/></svg></span><div><b>Kitchen Story posted</b><small>Today's preparation</small></div></div>
      </div>
    </div>
  </div>
</section>

<!-- WHY YUMMYVOO -->
<section id="why" class="sec alt">
  <div class="wrap">
    <div class="sh c rv"><h2>Why YummyVoo?</h2><p class="lead">Same kind of food. A lot more to know about it.</p></div>
    <div class="cmp rv">
      <div class="cbox plain">
        <h3><svg class="ic" aria-hidden="true"><use href="#i-menu"/></svg>Just a menu</h3>
        <div class="prow"><span>Item name</span><span>₹ —</span></div>
        <div class="prow"><span>Item name</span><span>₹ —</span></div>
        <div class="prow"><span>Item name</span><span>₹ —</span></div>
        <p class="note">A list of dishes. No idea who's cooking, or what today looks like in the kitchen.</p>
      </div>
      <div class="cbox y">
        <h3><svg class="ic" aria-hidden="true"><use href="#i-leaf"/></svg>A menu, plus the kitchen behind it</h3>
        <div class="ycard">
          <div class="yhead"><span class="rg"><span class="ph cream" data-img="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&amp;fit=crop&amp;w=200&amp;h=200&amp;q=80"></span></span><div><b>Green Bowl <svg class="ic" aria-hidden="true"><use href="#i-shield"/></svg></b><small>Cloud kitchen · Sector 62, Noida</small></div></div>
          <div class="yrow"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg>Kitchen Story: Today's preparation<em>2h ago</em></div>
          <div class="yrow"><svg class="ic" aria-hidden="true"><use href="#i-tag"/></svg>30% off Bowls &amp; Salads<em>Today</em></div>
          <div class="yrow"><svg class="ic" aria-hidden="true"><use href="#i-store"/></svg>Kitchen profile, menu &amp; reviews<em>4.8★</em></div>
        </div>
      </div>
    </div>
    <div class="pillars rv">
      <div class="pl"><svg class="ic" aria-hidden="true"><use href="#i-compass"/></svg><h3>Discover</h3><p>Find local food businesses.</p></div>
      <div class="pl"><svg class="ic" aria-hidden="true"><use href="#i-shield"/></svg><h3>Transparency</h3><p>Know more about the kitchen behind your food.</p></div>
      <div class="pl"><svg class="ic" aria-hidden="true"><use href="#i-play"/></svg><h3>Stories</h3><p>See what kitchens are preparing today.</p></div>
      <div class="pl"><svg class="ic" aria-hidden="true"><use href="#i-pin"/></svg><h3>Local</h3><p>Support and discover nearby food businesses.</p></div>
      <div class="pl"><svg class="ic" aria-hidden="true"><use href="#i-bolt"/></svg><h3>Convenience</h3><p>Order from one simple app.</p></div>
    </div>
  </div>
</section>

<!-- DOWNLOAD -->
<section id="download" class="sec">
  <div class="wrap">
    <div class="dpanel rv">
      <div style="padding-bottom:clamp(8px,3vw,48px)">
        <h2>Your Next Favorite Kitchen Is Waiting.</h2>
        <p class="lead">Download YummyVoo and discover local food, kitchen stories, and new favorites.</p>
        <div class="stores">
          <a class="store" href="#" data-store="ios"><svg aria-hidden="true"><use href="#i-apple"/></svg><span><small>Download on the</small><b>App Store</b></span></a>
          <a class="store" href="#" data-store="android"><svg aria-hidden="true"><use href="#i-gplay"/></svg><span><small>Get it on</small><b>Google Play</b></span></a>
        </div>
        <p class="dnote">Discover • Watch • Order</p>
      </div>
      <div class="dv" role="img" aria-label="The YummyVoo app home screen"><div class="phone" data-screen="home" aria-hidden="true"></div></div>
    </div>
  </div>
</section>

<!-- ABOUT -->
<section id="about" class="sec alt about">
  <div class="wrap rv">
    <h2>We're Building a Better Way to Discover Local Food.</h2>
    <p>YummyVoo was created to make local food discovery more personal, transparent, and engaging — while helping cloud kitchens build stronger relationships with customers.</p>
    <div class="vals"><span><svg class="ic" aria-hidden="true"><use href="#i-heart"/></svg>Personal</span><span><svg class="ic" aria-hidden="true"><use href="#i-shield"/></svg>Transparent</span><span><svg class="ic" aria-hidden="true"><use href="#i-spark"/></svg>Engaging</span></div>
  </div>
</section>

</main>

<footer class="foot">
  <div class="wrap">
    <div class="fgrid">
      <div>
        <a class="brand" href="#home" aria-label="YummyVoo home"><svg class="brand-mk" aria-hidden="true"><use href="#logo"/></svg><span class="brand-nm">Yummy<b>Voo</b></span></a>
        <p class="tagl">Discover. Watch. Order.</p>
        <p class="fd2">Local cloud kitchens, their stories, and food you actually want to try.</p>
      </div>
      <div><h4>Explore</h4><ul><li><a href="#home">Home</a></li><li><a href="#about">About</a></li><li><a href="#features">Features</a></li><li><a href="#stories">Kitchen Stories</a></li><li><a href="#eco">Eco Packaging</a></li><li><a href="#kitchens">For Kitchens</a></li><li><a href="mailto:admin@yummyvoo.com">Contact</a></li></ul></div>
      <div><h4>Legal</h4><ul><li><a href="#" data-soon="Privacy Policy is coming soon">Privacy Policy</a></li><li><a href="#" data-soon="Terms &amp; Conditions are coming soon">Terms &amp; Conditions</a></li></ul></div>
      <div><h4>Social</h4><ul><li><a href="#" data-soon="Instagram link coming soon">Instagram</a></li><li><a href="#" data-soon="LinkedIn link coming soon">LinkedIn</a></li><li><a href="#" data-soon="YouTube link coming soon">YouTube</a></li></ul></div>
      <div><h4>Contact</h4><ul><li><a href="mailto:admin@yummyvoo.com">admin@yummyvoo.com</a></li><li>Noida, India</li></ul></div>
    </div>
    <div class="fbot"><span>© 2026 YummyVoo. All rights reserved.</span><span>Made for local kitchens.</span></div>
  </div>
</footer>

<div class="toast" id="toast" role="status" aria-live="polite"></div>

<!-- ===== APP SCREEN TEMPLATES (cloned into phone frames) ===== -->
<template id="tpl-home"><div class="scr">
  <div class="sb" data-sb></div>
  <div class="a-top"><svg class="a-logo"><use href="#logo"/></svg><span class="a-loc"><svg class="ic"><use href="#i-pin"/></svg>Sector 62, Noida</span><span class="a-ic"><svg class="ic"><use href="#i-search"/></svg></span><span class="a-av">A</span></div>
  <div class="pad">
    <div class="a-eye">Welcome back</div>
    <div class="a-hello">Good food,<br>good mood 🌿</div>
    <div class="a-fav ph leaf" data-fd="bowl w64 r-10 t-22"><div class="shade"></div><div class="a-favc"><div class="a-row"><span class="a-hb"><svg class="ic"><use href="#i-heart"/></svg></span><b>Your Favorites</b></div><p>Tap to see your saved dishes and quick picks.</p><span class="a-glass">View your saved dishes <svg class="ic"><use href="#i-arrow"/></svg></span></div></div>
    <div class="a-sec"><div><span class="a-h">Today's Offers</span><small>Limited-time deals • ends soon</small></div><span class="a-pillw">See All <svg class="ic"><use href="#i-arrow"/></svg></span></div>
    <div class="a-offer ph wood" data-fd="burger w52 r-6 t-4"><div class="shade"></div><div class="a-offc"><div class="a-tags"><span class="a-tag">Burgers &amp; Wraps</span><span class="a-tag g">Promo</span></div><b>50% OFF</b><small>Juicy burgers &amp; wraps · Ends in 2h 14m</small></div></div>
    <div class="a-sec"><span class="a-h sm">Kitchen Stories</span></div>
    <div class="a-stories">
      <div class="a-story"><div class="a-ring"><div class="ph cream" data-fd="bowl w118 l-9 t-9"></div></div>Green Bowl</div>
      <div class="a-story"><div class="a-ring"><div class="ph cream" data-fd="thali w118 l-9 t-9"></div></div>Amma's</div>
      <div class="a-story"><div class="a-ring off"><div class="ph cream" data-fd="tiffin w104 l-2 t-2"></div></div>Healthy Ghar</div>
      <div class="a-story"><div class="a-ring off"><div class="ph cream" data-fd="cake w118 l-9 t-9"></div></div>Morning Bites</div>
    </div>
  </div>
  <div class="a-nav" data-nav="home"></div>
</div></template>

<template id="tpl-explore"><div class="scr">
  <div class="sb" data-sb></div>
  <div class="a-top" style="height:50px"><svg class="a-logo"><use href="#logo"/></svg><b class="a-title" style="font-size:22px;flex:1">Explore</b><span class="a-av">A</span></div>
  <div class="pad">
    <div class="a-search"><svg class="ic"><use href="#i-search"/></svg>Search kitchens, dishes, dietary…</div>
    <div style="margin:12px 0 0"><span class="a-chip on"><svg class="ic"><use href="#i-filter"/></svg>Filters</span></div>
    <div class="a-sec" style="margin:16px 0 10px"><div><span class="a-h sm">Kitchen Stories</span><small>See what's cooking right now</small></div></div>
    <div class="a-scards">
      <div class="a-sc ph leaf" data-fd="pan w150 l-22 t34"><span class="a-lv">Live</span><div class="shade"></div><b>Pasta Fresca<br><span style="font-weight:600;opacity:.85">Making today's handmade…</span></b></div>
      <div class="a-sc ph wood" data-fd="matcha w96 l2 t30"><span class="a-lv">Live</span><div class="shade"></div><b>Matcha Reserve<br><span style="font-weight:600;opacity:.85">Perfect iced latte…</span></b></div>
      <div class="a-sc ph cream" data-fd="bowl w130 l-15 t28"><div class="shade"></div><b>Acai Artisans<br><span style="font-weight:600;opacity:.85">Fresh bowls daily</span></b></div>
    </div>
    <div class="a-sec" style="margin:18px 0 10px"><span class="a-h sm">Trending Now</span><span class="a-pillw">See All <svg class="ic"><use href="#i-arrow"/></svg></span></div>
    <div class="a-trend"><div class="ph cream" data-fd="bowl w70 l15 t-6"><span class="a-rate"><svg class="ic fl" style="color:#e0a020"><use href="#i-star"/></svg>4.9</span></div><div class="a-tb"><b>The Poke Botanist</b><small>Hawaiian • Fresh Bowls • Healthy</small><span class="a-prep"><i></i>Preparing now</span></div></div>
  </div>
  <div class="a-nav" data-nav="explore"></div>
</div></template>

<template id="tpl-story"><div class="scr dark">
  <div class="st-bg ph wood sh2" data-fd="pan w176 l-32 t24;steam w58 l32 t8"></div>
  <div class="sb" data-sb></div>
  <div class="st-bars"><i class="f"></i><i class="f"></i><i><b></b></i><i></i></div>
  <div class="st-head"><div class="k-logo"><div class="ph cream" data-fd="bowl w120 l-10 t-10"></div></div><div><b>Green Bowl</b><small><i></i>Preparing now</small></div><span class="st-fol">Follow</span></div>
  <div class="st-rail"><div><svg class="ic"><use href="#i-heart"/></svg>2.4k</div><div><svg class="ic"><use href="#i-msg"/></svg>86</div><div><svg class="ic"><use href="#i-share"/></svg>Share</div></div>
  <div class="st-feat"><small>Featured item</small><b>Chicken Pesto Bowl</b><p>Our signature organic quinoa bowl, made fresh this morning.</p><span class="a-cta">Order Now <svg class="ic"><use href="#i-arrow"/></svg></span></div>
</div></template>

<template id="tpl-kitchen"><div class="scr">
  <div class="sb abs" data-sb></div>
  <span class="k-bk"><svg class="ic"><use href="#i-arrow-l"/></svg></span>
  <div class="k-hero ph wood" data-fd="bowl w86 l7 t4"><div class="shade t"></div></div>
  <div class="k-sheet">
    <div class="k-id"><div class="k-logo"><div class="ph cream" data-fd="bowl w120 l-10 t-10"></div><span class="k-ver"><svg class="ic"><use href="#i-check"/></svg></span></div><div class="k-nm"><b>Green Bowl</b><span><i></i>Currently preparing</span></div></div>
    <div class="k-stats"><div><b>12.4k</b><small>Followers</small></div><div><b>4.8 ★</b><small>Rating</small></div><span class="k-follow">Follow</span></div>
    <p class="k-desc">Locally sourced, organic ingredients crafted into nourishing bowls. Wholesome eating without the fuss.</p>
    <div class="k-tabs"><span class="on">MENU</span><span>STORIES</span><span>REELS</span><span>REVIEWS</span><span>ABOUT</span></div>
    <div class="k-chips"><span class="a-chip on">Signature Bowls</span><span class="a-chip">Salads</span><span class="a-chip">Smoothies</span><span class="a-chip">Sides</span></div>
    <div class="a-sec" style="margin:12px 0 0"><span class="a-h sm">Signature Bowls</span><small>6 items</small></div>
    <div class="mi"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b><i class="vg nv"></i>Chicken Pesto Bowl</b><p>Grilled chicken, fresh pesto, quinoa &amp; greens</p><strong>₹249</strong></div><div class="r"><span class="add">+ Add</span></div></div>
    <div class="mi"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b><i class="vg"></i>Vegan Buddha Bowl</b><p>Crispy chickpeas, sweet potato, roasted veg</p><strong>₹219</strong></div><div class="r"><span class="add">+ Add</span></div></div>
  </div>
</div></template>

<template id="tpl-menu"><div class="scr">
  <div class="sb" data-sb></div>
  <div class="a-top"><span class="a-ic"><svg class="ic"><use href="#i-arrow-l"/></svg></span><b class="a-title" style="font-size:20px;flex:1">Green Bowl</b><span class="a-ic"><svg class="ic"><use href="#i-search"/></svg></span></div>
  <div class="pad">
    <div class="k-chips" style="margin-top:0"><span class="a-chip on">Signature Bowls</span><span class="a-chip">Salads</span><span class="a-chip">Smoothies</span></div>
    <div class="a-sec" style="margin:14px 0 2px"><span class="a-h sm">Signature Bowls</span><small>6 items</small></div>
    <div class="mi"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b><i class="vg nv"></i>Chicken Pesto Bowl</b><p>Grilled chicken, fresh pesto, quinoa &amp; greens</p><strong>₹249</strong></div><div class="r"><span class="stp">− 1 +</span></div></div>
    <div class="mi"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b><i class="vg"></i>Vegan Buddha Bowl</b><p>Crispy chickpeas, sweet potato, roasted veg</p><strong>₹219</strong></div><div class="r"><span class="add">+ Add</span></div></div>
    <div class="mi"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b><i class="vg nv"></i>Teriyaki Salmon Bowl</b><p>Glazed salmon, edamame, sesame, pickled radish</p><strong>₹329</strong></div><div class="r"><span class="add">+ Add</span></div></div>
    <div class="mi"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b><i class="vg"></i>Paneer Tikka Bowl</b><p>Charred paneer, mint yogurt, brown rice</p><strong>₹239</strong></div><div class="r"><span class="add">+ Add</span></div></div>
  </div>
  <div class="cart"><div><small>1 ITEM IN CART</small><b>₹249</b></div><span>View Cart <svg class="ic"><use href="#i-arrow"/></svg></span></div>
  <div class="a-nav" data-nav="explore"></div>
</div></template>

<template id="tpl-dish"><div class="scr">
  <div class="sb abs" data-sb style="color:#121e17"></div>
  <span class="d-btn" style="left:16px"><svg class="ic"><use href="#i-arrow-l"/></svg></span><span class="d-btn" style="right:16px"><svg class="ic"><use href="#i-heart"/></svg></span>
  <div class="d-top ph cream" data-fd="bowl w80 l10 t12"></div>
  <div class="d-sheet">
    <h4>Chicken Pesto Bowl</h4>
    <div class="d-by"><span class="vg nv"></span>from Green Bowl · Sector 62</div>
    <div class="d-meta"><span><svg class="ic fl" style="color:#e0a020"><use href="#i-star"/></svg>4.8</span><span><svg class="ic"><use href="#i-clock"/></svg>15–20 min</span><span><svg class="ic"><use href="#i-leaf"/></svg>High protein</span></div>
    <p>Our signature organic quinoa bowl with grilled chicken, basil pesto, cherry tomatoes and avocado.</p>
    <div class="d-tags"><span>Quinoa</span><span>Grilled chicken</span><span>Basil pesto</span><span>Avocado</span><span>Cherry tomato</span></div>
  </div>
  <div class="d-bar"><div class="d-q"><span>−</span><span>1</span><span>+</span></div><div class="d-add"><span>Add to cart</span><span>₹249</span></div></div>
</div></template>

<template id="tpl-order"><div class="scr">
  <div class="sb" data-sb></div>
  <div class="a-top"><b class="a-title" style="font-size:24px;flex:1">Orders</b><span class="a-av">A</span></div>
  <div class="o-tabs"><span class="on">Active</span><span>Past Orders</span></div>
  <div class="o-l">Tracking</div>
  <div class="o-card">
    <div class="o-hd"><div class="ph cream" data-fd="bowl w130 l-15 t-15"></div><div><b>Green Bowl</b><small>Order #YV-8203</small></div><em>₹420</em></div>
    <div class="o-st"><span>On the way</span><span>Est. 12:45 PM</span></div>
    <div class="o-pg"><i></i></div>
    <div class="o-steps"><span>Confirmed</span><span>Preparing</span><span>On the way</span><span>Delivered</span></div>
    <p class="o-it">1× Rainbow Quinoa Salad, 1× Cold Pressed Green Juice</p>
    <span class="o-btn"><svg class="ic"><use href="#i-pin"/></svg>Track Order</span>
  </div>
  <div class="o-l" style="margin-top:22px">Past orders</div>
  <div class="o-card">
    <div class="o-hd"><div class="ph cream" data-fd="thali w130 l-15 t-15"></div><div><b>Amma's Kitchen</b><small>Yesterday · Delivered</small></div><em style="font-size:13px">₹380</em></div>
    <p class="o-it">1× Special Veg Thali, 1× Sweet Lassi</p>
    <div class="o-past" style="margin-top:0"><span>Reorder</span><span class="fill">Rate</span></div>
  </div>
  <div class="a-nav" data-nav="orders"></div>
</div></template>
`