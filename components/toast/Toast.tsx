import { notification } from "antd";
import { NotificationPlacement } from "antd/es/notification/interface";
const [api, contextHolder] = notification.useNotification();
export const openNotification = (
  placement: NotificationPlacement,
  mess: string
) => {
  api.success({
    message: mess,
    placement,
    duration: 1.8,
  });
};
export const openNotificationFail = (
  placement: NotificationPlacement,
  mess: string
) => {
  api.error({
    message: mess,
    placement,
    duration: 1.8,
  });
};
