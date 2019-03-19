import React from 'react';
import { PaginationItem, PaginationLink } from 'reactstrap';

type Props = {
  count: number;
  take: number;
  onChange: (currentPage: number) => void;
};
type State = {
  currentPage: number;
};

export default class PostsPagination extends React.Component<Props, State> {
  pagesCount: number;

  constructor(props: Props) {
    super(props);

    this.pagesCount = Math.ceil(this.props.count / this.props.take);

    this.state = {
      currentPage: 0
    };
  }

  handleClick(e: React.SyntheticEvent<any, Event>, index: number) {
    e.preventDefault();

    this.setState({
      currentPage: index
    });
    this.props.onChange(index);
  }

  render() {
    const { currentPage } = this.state;

    if (this.props.count) {
      return (
        <div className="pagination-wrapper">
          <nav aria-label="Page navigation">
            <ul className="mb-0 pagination">
              <PaginationItem disabled={currentPage <= 0}>
                <PaginationLink
                  onClick={e => this.handleClick(e, currentPage - 1)}
                  previous
                  href=""
                />
              </PaginationItem>
              {[...Array(this.pagesCount)].map((_, i) => (
                <PaginationItem active={i === currentPage} key={i}>
                  <PaginationLink onClick={e => this.handleClick(e, i)} href="">
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                <PaginationLink
                  onClick={e => this.handleClick(e, currentPage + 1)}
                  next
                  href=""
                />
              </PaginationItem>
            </ul>
          </nav>
        </div>
      );
    } else {
      return null;
    }
  }
}
