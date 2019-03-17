import { FormattedMessage } from 'react-intl';

export default () => (
  <tr>
    <th>
      <FormattedMessage id="title" defaultMessage="Title" />
    </th>
    <th>
      <FormattedMessage id="slug" defaultMessage="Slug" />
    </th>
    <th>
      <FormattedMessage id="author" defaultMessage="Author" />
    </th>
    <th>
      <FormattedMessage id="created" defaultMessage="Created" />
    </th>
    <th>
      <FormattedMessage id="updated" defaultMessage="Updated" />
    </th>
  </tr>
);
