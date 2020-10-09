import React from 'react'
import { Col, Divider, Row } from 'antd'

import trending from '../assets/mocks/trending'
import PostsGrid from '../components/grid/PostsGrid'
import { mergeStyles, trendingGridConfig } from '../helpers/helpers'

const trendingPosts = mergeStyles(trending, trendingGridConfig)

function BlogMock() {
  return (
    <main className="home">
      <section className="container">
        <div className="row">
          <Row justify="center">
            <Col lg={16} md={24}>
              <div className="post-details">
                <div className="post-head">
                  <div className="author-avatar">
                    <img
                      src="https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/00d168bf49d5f1774c633a7dcc3a1f4a51395bc2_full.jpg"
                      alt="dummy"
                    />
                  </div>
                  <div className="author-desc">
                    <div className="author-name">Lizzy Keen</div>
                    <br />
                    <div className="author-bio">
                      Lizzy is a technical writer who covers frontend frameworks, web standards,
                      accessibility, WordPress development, UX design, and more
                    </div>
                  </div>
                </div>
                <div className="post-body">
                  <h1 className="post-title">5 tricks to eliminate render blocking Resources</h1>
                  <div className="post-date">September 23, 2020</div>
                  <div className="post-cover-image">
                    <img
                      src={require(`./../assets/images/4.jpg`)}
                      className="post-item-image"
                      alt="4.jpg"
                    />
                  </div>
                  <div className="post-desc">
                    Render blocking resources are static files, such as fonts, HTML, CSS, and
                    JavaScript files, that are vital to the process of rendering a web page. When
                    the browser encounters a render blocking resource, it stops downloading the rest
                    of the resources until these critical files are processed. In the meantime, the
                    entire rendering process is put on hold. On the other hand, non-render blocking
                    resources don’t postpone the rendering of the page.
                    <h3>
                      The browser can safely download them in the background after the initial page
                      render.
                    </h3>
                    However, not all resources that the browser deems render blocking are essential
                    for the first paint; it all depends on the individual characteristics of the
                    page. There are best practices you can use to turn these noncritical render
                    blocking resources into non-render blocking ones. Besides, you can also decrease
                    the number and/or size of render blocking resources that are still critica
                    <br />l and can’t be eliminated. Why eliminate render blocking resources? If you
                    reduce the number of render blocking resources, you can shorten the critical
                    rendering path and reduce page load times, thusimproving the user experience and
                    search engine optimization . There are three ways to reduce the number and
                    impact of render blocking resources: Make them non-render blocking resources by
                    deferring their download Decrease the total number of render blocking resources
                    using techniques such as bundling
                    <h3>Reduce the size of a resource via minification </h3> so that the page has
                    fewer bytes to load Types of render blocking resources As a rule of thumb, the
                    browser treats everything it finds in the section of an HTML page as render
                    blocking. This includes: CSS stylesheets JavaScript files added in the section
                    Fonts added from either CDN or a local server HTML imports (even though HTML
                    imports are now obsolete, you might still encounter them on legacy pages)
                    Images, media files, and tags placed at the bottom of the section are treated as
                    non-render blocking resources. Now let’s zoom in on five strategi
                    <br />
                    <br />
                    es to eliminate or reduce the number and impact of render blocking resources. 1.
                    Don’t add CSS with the @import rule You can add CSS to a page using either: The
                    tag that you need to add to your HTML file The @import rule that you need to add
                    to your CSS file Even though the @import rule keeps your HTML file cleaner and
                    allows you to keep all your CSS dependencies in the same place, it’s not the
                    best choice performance-wise. The @import
                    <br />
                    <br /> rule lets you import CSS from other stylesheets, but this causes the
                    browser to process your CSS file more slowly because it also has to download the
                    imported files. Until this takes place, the rendering process will be blocked.
                  </div>
                </div>
                <div className="post-foot"></div>
              </div>
            </Col>
          </Row>
        </div>
      </section>
      <Divider />
      <section className="container">
        <div className="row">
          <h2 className="section-heading">Recommended Posts</h2>
          <PostsGrid posts={trendingPosts} columns={3} />
        </div>
      </section>
    </main>
  )
}

export default BlogMock
