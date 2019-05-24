import {Subscription} from 'rxjs';

export class SubscriptionUtils {
  static unsubscribe(subscription: Subscription) {
    if (subscription) {
      subscription.unsubscribe();
    }
  }
}
