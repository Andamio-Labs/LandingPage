import arrowDown from "@phosphor-icons/core/assets/regular/arrow-down.svg?raw";
import arrowRight from "@phosphor-icons/core/assets/regular/arrow-right.svg?raw";
import arrowUpRight from "@phosphor-icons/core/assets/regular/arrow-up-right.svg?raw";
import barbell from "@phosphor-icons/core/assets/regular/barbell.svg?raw";
import calendarCheck from "@phosphor-icons/core/assets/regular/calendar-check.svg?raw";
import calendarDots from "@phosphor-icons/core/assets/regular/calendar-dots.svg?raw";
import chatCircleDots from "@phosphor-icons/core/assets/regular/chat-circle-dots.svg?raw";
import check from "@phosphor-icons/core/assets/regular/check.svg?raw";
import clock from "@phosphor-icons/core/assets/regular/clock.svg?raw";
import coffee from "@phosphor-icons/core/assets/regular/coffee.svg?raw";
import copy from "@phosphor-icons/core/assets/regular/copy.svg?raw";
import deviceMobile from "@phosphor-icons/core/assets/regular/device-mobile.svg?raw";
import dog from "@phosphor-icons/core/assets/regular/dog.svg?raw";
import drop from "@phosphor-icons/core/assets/regular/drop.svg?raw";
import envelopeSimple from "@phosphor-icons/core/assets/regular/envelope-simple.svg?raw";
import flowerLotus from "@phosphor-icons/core/assets/regular/flower-lotus.svg?raw";
import flowerTulip from "@phosphor-icons/core/assets/regular/flower-tulip.svg?raw";
import gameController from "@phosphor-icons/core/assets/regular/game-controller.svg?raw";
import githubLogo from "@phosphor-icons/core/assets/regular/github-logo.svg?raw";
import globeSimple from "@phosphor-icons/core/assets/regular/globe-simple.svg?raw";
import handGrabbing from "@phosphor-icons/core/assets/regular/hand-grabbing.svg?raw";
import linkedinLogo from "@phosphor-icons/core/assets/regular/linkedin-logo.svg?raw";
import list from "@phosphor-icons/core/assets/regular/list.svg?raw";
import mapPin from "@phosphor-icons/core/assets/regular/map-pin.svg?raw";
import minus from "@phosphor-icons/core/assets/regular/minus.svg?raw";
import moon from "@phosphor-icons/core/assets/regular/moon.svg?raw";
import notebook from "@phosphor-icons/core/assets/regular/notebook.svg?raw";
import packageIcon from "@phosphor-icons/core/assets/regular/package.svg?raw";
import paperPlaneTilt from "@phosphor-icons/core/assets/regular/paper-plane-tilt.svg?raw";
import penNib from "@phosphor-icons/core/assets/regular/pen-nib.svg?raw";
import personSimpleTaiChi from "@phosphor-icons/core/assets/regular/person-simple-tai-chi.svg?raw";
import plus from "@phosphor-icons/core/assets/regular/plus.svg?raw";
import scissors from "@phosphor-icons/core/assets/regular/scissors.svg?raw";
import shoppingBag from "@phosphor-icons/core/assets/regular/shopping-bag.svg?raw";
import soccerBall from "@phosphor-icons/core/assets/regular/soccer-ball.svg?raw";
import storefront from "@phosphor-icons/core/assets/regular/storefront.svg?raw";
import sun from "@phosphor-icons/core/assets/regular/sun.svg?raw";
import tooth from "@phosphor-icons/core/assets/regular/tooth.svg?raw";
import whatsappLogo from "@phosphor-icons/core/assets/regular/whatsapp-logo.svg?raw";
import x from "@phosphor-icons/core/assets/regular/x.svg?raw";

export const icons = {
  "arrow-down": arrowDown,
  "arrow-right": arrowRight,
  "arrow-up-right": arrowUpRight,
  barbell,
  "calendar-check": calendarCheck,
  "calendar-dots": calendarDots,
  "chat-circle-dots": chatCircleDots,
  check,
  clock,
  coffee,
  copy,
  "device-mobile": deviceMobile,
  dog,
  drop,
  "envelope-simple": envelopeSimple,
  "flower-lotus": flowerLotus,
  "flower-tulip": flowerTulip,
  "game-controller": gameController,
  "github-logo": githubLogo,
  "globe-simple": globeSimple,
  "hand-grabbing": handGrabbing,
  "linkedin-logo": linkedinLogo,
  list,
  "map-pin": mapPin,
  minus,
  moon,
  notebook,
  package: packageIcon,
  "paper-plane-tilt": paperPlaneTilt,
  "pen-nib": penNib,
  "person-simple-tai-chi": personSimpleTaiChi,
  plus,
  scissors,
  "shopping-bag": shoppingBag,
  "soccer-ball": soccerBall,
  storefront,
  sun,
  tooth,
  "whatsapp-logo": whatsappLogo,
  x,
} as const;

export type IconName = keyof typeof icons;
