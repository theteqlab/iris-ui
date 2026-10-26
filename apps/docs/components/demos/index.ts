import type { ComponentType } from "react";
import AlertBasic from "./alert/basic";
import AlertIcon from "./alert/icon";
import AlertTones from "./alert/tones";
import AvatarBasic from "./avatar/basic";
import AvatarGroup from "./avatar/group";
import AvatarSizes from "./avatar/sizes";
import BadgeBasic from "./badge/basic";
import BadgeDot from "./badge/dot";
import BadgeTones from "./badge/tones";
import ButtonAsChild from "./button/as-child";
import ButtonBasic from "./button/basic";
import ButtonIcons from "./button/icons";
import ButtonLoading from "./button/loading";
import ButtonSizes from "./button/sizes";
import ButtonTones from "./button/tones";
import CardAsChild from "./card/as-child";
import CardBasic from "./card/basic";
import CardVariants from "./card/variants";
import CheckboxBasic from "./checkbox/basic";
import CheckboxField from "./checkbox/field";
import CheckboxIndeterminate from "./checkbox/indeterminate";
import DialogBasic from "./dialog/basic";
import DialogControlled from "./dialog/controlled";
import DialogDanger from "./dialog/danger";
import DialogScroll from "./dialog/scroll";
import DropdownMenuBasic from "./dropdown-menu/basic";
import DropdownMenuCheckable from "./dropdown-menu/checkable";
import DropdownMenuSubmenu from "./dropdown-menu/submenu";
import FieldBasic from "./field/basic";
import FieldDisabled from "./field/disabled";
import FieldError from "./field/error";
import IconButtonBasic from "./icon-button/basic";
import IconButtonSizes from "./icon-button/sizes";
import InputBasic from "./input/basic";
import InputInvalid from "./input/invalid";
import InputSizes from "./input/sizes";
import InputSlots from "./input/slots";
import PopoverArrow from "./popover/arrow";
import PopoverBasic from "./popover/basic";
import ProgressBasic from "./progress/basic";
import ProgressIndeterminate from "./progress/indeterminate";
import ProgressTones from "./progress/tones";
import RadioGroupBasic from "./radio-group/basic";
import RadioGroupHorizontal from "./radio-group/horizontal";
import SelectBasic from "./select/basic";
import SelectGroups from "./select/groups";
import SelectInvalid from "./select/invalid";
import SwitchBasic from "./switch/basic";
import SwitchControlled from "./switch/controlled";
import SwitchSizes from "./switch/sizes";
import TabsBasic from "./tabs/basic";
import TabsUnderline from "./tabs/underline";
import TextareaAutoResize from "./textarea/auto-resize";
import TextareaBasic from "./textarea/basic";
import TextareaCount from "./textarea/count";
import ToastAction from "./toast/action";
import ToastBasic from "./toast/basic";
import ToastTones from "./toast/tones";
import TooltipBasic from "./tooltip/basic";
import TooltipSides from "./tooltip/sides";

/** Every live demo, by path under components/demos (the source shown is read from that file). */
export const demos: Record<string, ComponentType> = {
  "alert/basic": AlertBasic,
  "alert/icon": AlertIcon,
  "alert/tones": AlertTones,
  "avatar/basic": AvatarBasic,
  "avatar/group": AvatarGroup,
  "avatar/sizes": AvatarSizes,
  "badge/basic": BadgeBasic,
  "badge/dot": BadgeDot,
  "badge/tones": BadgeTones,
  "button/as-child": ButtonAsChild,
  "button/basic": ButtonBasic,
  "button/icons": ButtonIcons,
  "button/loading": ButtonLoading,
  "button/sizes": ButtonSizes,
  "button/tones": ButtonTones,
  "card/as-child": CardAsChild,
  "card/basic": CardBasic,
  "card/variants": CardVariants,
  "checkbox/basic": CheckboxBasic,
  "checkbox/field": CheckboxField,
  "checkbox/indeterminate": CheckboxIndeterminate,
  "dialog/basic": DialogBasic,
  "dialog/controlled": DialogControlled,
  "dialog/danger": DialogDanger,
  "dialog/scroll": DialogScroll,
  "dropdown-menu/basic": DropdownMenuBasic,
  "dropdown-menu/checkable": DropdownMenuCheckable,
  "dropdown-menu/submenu": DropdownMenuSubmenu,
  "field/basic": FieldBasic,
  "field/disabled": FieldDisabled,
  "field/error": FieldError,
  "icon-button/basic": IconButtonBasic,
  "icon-button/sizes": IconButtonSizes,
  "input/basic": InputBasic,
  "input/invalid": InputInvalid,
  "input/sizes": InputSizes,
  "input/slots": InputSlots,
  "popover/arrow": PopoverArrow,
  "popover/basic": PopoverBasic,
  "progress/basic": ProgressBasic,
  "progress/indeterminate": ProgressIndeterminate,
  "progress/tones": ProgressTones,
  "radio-group/basic": RadioGroupBasic,
  "radio-group/horizontal": RadioGroupHorizontal,
  "select/basic": SelectBasic,
  "select/groups": SelectGroups,
  "select/invalid": SelectInvalid,
  "switch/basic": SwitchBasic,
  "switch/controlled": SwitchControlled,
  "switch/sizes": SwitchSizes,
  "tabs/basic": TabsBasic,
  "tabs/underline": TabsUnderline,
  "textarea/auto-resize": TextareaAutoResize,
  "textarea/basic": TextareaBasic,
  "textarea/count": TextareaCount,
  "toast/action": ToastAction,
  "toast/basic": ToastBasic,
  "toast/tones": ToastTones,
  "tooltip/basic": TooltipBasic,
  "tooltip/sides": TooltipSides,
};
