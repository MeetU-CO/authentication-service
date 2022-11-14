export interface Notification {
  id_offering: string;
  type: TypeNotification;
}

enum TypeNotification {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  WARNING = 'warning',
}
