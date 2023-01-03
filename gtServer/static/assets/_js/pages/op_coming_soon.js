/*
 *  Document   : op_coming_soon.js
 *  Author     : pixelcave
 *  Description: Custom JS code used in Coming Soon Page
 */

class pageComingSoon {
  /*
   * Init Countdown.js, for more examples you can check out https://github.com/hilios/jQuery.countdown
   *
   */
  static countdown() {
    jQuery('.js-countdown').countdown((new Date().getFullYear() + 2) + '/01/15', e => {
      jQuery(e.currentTarget).html(e.strftime('<div class="row items-push py-3 text-center">'
        + '<div class="col-6 col-md-3"><div class="fs-1 fw-bold text-white">%-D</div><div class="fs-sm fw-bold text-muted">DAYS</div></div>'
        + '<div class="col-6 col-md-3"><div class="fs-1 fw-bold text-white">%H</div><div class="fs-sm fw-bold text-muted">HOURS</div></div>'
        + '<div class="col-6 col-md-3"><div class="fs-1 fw-bold text-white">%M</div><div class="fs-sm fw-bold text-muted">MINUTES</div></div>'
        + '<div class="col-6 col-md-3"><div class="fs-1 fw-bold text-white">%S</div><div class="fs-sm fw-bold text-muted">SECONDS</div></div>'
        + '</div>'
      ));
    });
  }

  /*
   * Init functionality
   *
   */
  static init() {
    this.countdown();
  }
}

// Initialize when page loads
One.onLoad(pageComingSoon.init());
