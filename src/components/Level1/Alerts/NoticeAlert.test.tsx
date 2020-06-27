import React from 'react'
import { shallow } from 'enzyme'

import { NoticeAlert } from './NoticeAlert'

describe("<NoticeAlert /> props is ''", () => {
  const container = shallow(<NoticeAlert title="" content="" />)

  it('SnapShot test', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('should have a Alert-component', () => {
    expect(container.find('[data-testid="Alert-component"]').length).toBe(1)
  })

  it('should render with prop', () => {
    const alertComponent = container.find('[data-testid="Alert-component"]')
    const alertTitleComponent = alertComponent.find(
      '[data-testid="AlertTitle-component"]'
    )
    expect(alertTitleComponent.text()).toBe('')
    expect(alertComponent.text()).toBe('')
  })
})

describe('<NoticeAlert /> has props', () => {
  const container = shallow(
    <NoticeAlert title="testtitle" content="testcontent" />
  )
  it('SnapShot test', () => {
    expect(container.html()).toMatchSnapshot()
  })

  it('should have a Alert-component', () => {
    expect(container.find('[data-testid="Alert-component"]').length).toBe(1)
  })

  it('NoticeAlert-component has render & props', () => {
    const alertComponent = container.find('[data-testid="Alert-component"]')
    const alertTitleComponent = alertComponent.find(
      '[data-testid="AlertTitle-component"]'
    )
    expect(alertTitleComponent.text()).toBe('testtitle')
    expect(alertComponent.text()).toMatch(/testcontent/)
  })
})
